#!/usr/bin/env node

/**
 * ShortKing ngrok Tunnel Manager
 * Starts and monitors an ngrok tunnel to expose local Fastify API or Next.js frontend.
 */

import { spawn, execSync } from "child_process";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// 1. Helper to read .env files if process.env doesn't have variables
function loadEnv() {
  const envPaths = [
    path.join(rootDir, ".env"),
    path.join(rootDir, "backend", ".env"),
    path.join(rootDir, "frontend", ".env.local"),
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      try {
        const content = fs.readFileSync(envPath, "utf-8");
        for (const line of content.split("\n")) {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
            const idx = trimmed.indexOf("=");
            const key = trimmed.slice(0, idx).trim();
            const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
            if (!process.env[key] && val) {
              process.env[key] = val;
            }
          }
        }
      } catch {
        // ignore
      }
    }
  }
}

loadEnv();

// Parse CLI arguments (--port 3000 or default to 5000)
const args = process.argv.slice(2);
let explicitPort = null;
const portArgIndex = args.indexOf("--port");
if (portArgIndex !== -1 && args[portArgIndex + 1]) {
  explicitPort = parseInt(args[portArgIndex + 1], 10);
}

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
const authToken = process.env.NGROK_AUTHTOKEN;

// Verify ngrok executable is available
function checkNgrokInstalled() {
  try {
    execSync("which ngrok", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

// Check if port 5000 is occupied by Apple AirPlay Receiver
function checkPortConflict(port) {
  return new Promise((resolve) => {
    if (port !== 5000) {
      return resolve({ port, isAirPlay: false });
    }

    const req = http.request(
      {
        host: "127.0.0.1",
        port: 5000,
        method: "GET",
        timeout: 600,
      },
      (res) => {
        const serverHeader = (res.headers["server"] || "").toLowerCase();
        if (serverHeader.includes("airtunes") || res.statusCode === 403) {
          resolve({ port: 5001, isAirPlay: true });
        } else {
          resolve({ port: 5000, isAirPlay: false });
        }
      },
    );

    req.on("error", () => {
      resolve({ port: 5000, isAirPlay: false });
    });

    req.on("timeout", () => {
      req.destroy();
      resolve({ port: 5000, isAirPlay: false });
    });

    req.end();
  });
}

// Print formatted banner
function printBanner({ publicUrl, port, isAirPlay, isFrontendMode, note }) {
  console.log("\n─────────────────────────────────────────────────────────────────");
  console.log(
    isFrontendMode
      ? " 👑 ShortKing Development Environment (Frontend Tunnel Mode)"
      : " 👑 ShortKing Development Environment",
  );
  console.log("─────────────────────────────────────────────────────────────────\n");

  if (isFrontendMode) {
    console.log(`  Frontend (Local):   ${frontendUrl}`);
    if (publicUrl) {
      console.log(`  Frontend (Public):  ${publicUrl}`);
    }
    console.log(`  Backend (Local):    http://localhost:${port === 3000 ? 5000 : port}`);
  } else {
    console.log(`  Frontend:           ${frontendUrl}`);
    console.log(`  Backend (Local):    http://localhost:${port}`);
    console.log(`  API Health Check:   http://localhost:${port}/api/v1/health`);

    if (publicUrl) {
      console.log(`\n  Public API URL:     ${publicUrl}`);
      console.log(`  Public Health Check:${publicUrl}/api/v1/health`);
      console.log(`  Short Code Demo:    ${publicUrl}/<shortCode>`);
    }
  }

  if (isAirPlay) {
    console.log("\n  ℹ️  Note: macOS AirPlay Receiver was detected on port 5000.");
    console.log("     Fastify and ngrok automatically routed to port 5001.");
    console.log("     (To use port 5000, disable AirPlay Receiver in macOS System Settings > General > AirDrop & Handoff).");
  }

  if (note) {
    console.log(`\n${note}`);
  }

  console.log("\n─────────────────────────────────────────────────────────────────\n");
}

// Query local ngrok API (127.0.0.1:4040/api/tunnels)
function fetchNgrokTunnelUrl(maxAttempts = 40) {
  return new Promise((resolve) => {
    let attempts = 0;

    const interval = setInterval(() => {
      attempts++;

      const req = http.get("http://127.0.0.1:4040/api/tunnels", (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            const data = JSON.parse(body);
            if (data.tunnels && data.tunnels.length > 0) {
              const httpsTunnel =
                data.tunnels.find((t) => t.proto === "https") || data.tunnels[0];
              if (httpsTunnel && httpsTunnel.public_url) {
                clearInterval(interval);
                resolve(httpsTunnel.public_url);
              }
            }
          } catch {
            // Wait for next attempt
          }
        });
      });

      req.on("error", () => {
        // ngrok web service starting up...
      });

      if (attempts >= maxAttempts) {
        clearInterval(interval);
        resolve(null);
      }
    }, 500);
  });
}

let ngrokProcess = null;

function cleanup() {
  if (ngrokProcess) {
    try {
      ngrokProcess.kill("SIGTERM");
    } catch {
      // ignore
    }
    ngrokProcess = null;
  }
}

process.on("SIGINT", () => {
  cleanup();
  process.exit(0);
});

process.on("SIGTERM", () => {
  cleanup();
  process.exit(0);
});

process.on("exit", () => {
  cleanup();
});

async function start() {
  let targetPort = explicitPort || (process.env.PORT ? parseInt(process.env.PORT, 10) : 5000);
  let isAirPlay = false;

  if (!explicitPort && targetPort === 5000) {
    const check = await checkPortConflict(5000);
    targetPort = check.port;
    isAirPlay = check.isAirPlay;
  }

  const isFrontendMode = explicitPort === 3000;

  if (!checkNgrokInstalled()) {
    printBanner({
      port: targetPort,
      isAirPlay,
      isFrontendMode,
      note: "  ⚠️  ngrok is not installed on this machine.\n     Install via Homebrew: brew install ngrok\n     Local development is fully active on localhost!",
    });
    // Keep process alive so concurrently doesn't exit if --kill-others is active
    setInterval(() => {}, 1000 * 60 * 60);
    return;
  }

  // Configure authtoken if provided in environment
  if (authToken) {
    try {
      execSync(`ngrok config add-authtoken "${authToken}"`, { stdio: "ignore" });
    } catch (err) {
      console.warn("Could not save NGROK_AUTHTOKEN to ngrok config:", err.message);
    }
  }

  // Spawn ngrok process
  ngrokProcess = spawn("ngrok", ["http", targetPort.toString(), "--log=stdout"], {
    stdio: ["ignore", "pipe", "pipe"],
  });

  let authFailed = false;

  const handleOutput = (data) => {
    const text = data.toString();
    if (
      text.includes("ERR_NGROK_4018") ||
      text.includes("authentication failed") ||
      text.includes("ERR_NGROK_108")
    ) {
      authFailed = true;
    }
  };

  ngrokProcess.stdout.on("data", handleOutput);
  ngrokProcess.stderr.on("data", handleOutput);

  ngrokProcess.on("exit", (code) => {
    if (authFailed || code !== 0) {
      printBanner({
        port: targetPort,
        isAirPlay,
        isFrontendMode,
        note: `  ⚠️  ngrok requires an authtoken to start a public tunnel.\n     1. Sign up for free: https://dashboard.ngrok.com/signup\n     2. Get your authtoken: https://dashboard.ngrok.com/get-started/your-authtoken\n     3. Add to your .env: NGROK_AUTHTOKEN=your-token-here\n        (or run: ngrok config add-authtoken <your-token>)\n\n     Local development is fully active on localhost!`,
      });
      // Keep running so concurrently doesn't exit prematurely
      setInterval(() => {}, 1000 * 60 * 60);
    }
  });

  // Poll for the public URL from the ngrok web service
  const publicUrl = await fetchNgrokTunnelUrl();

  if (publicUrl) {
    printBanner({
      publicUrl,
      port: targetPort,
      isAirPlay,
      isFrontendMode,
    });
  } else if (!authFailed) {
    printBanner({
      port: targetPort,
      isAirPlay,
      isFrontendMode,
      note: "  ℹ️  Tunnel is initializing... check http://127.0.0.1:4040 for details.",
    });
  }
}

start();
