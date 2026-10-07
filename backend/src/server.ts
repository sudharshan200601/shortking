import { buildApp } from "./app.js";
import { env } from "./config/env.js";

async function start() {
  const app = await buildApp();
  let port = env.PORT;

  try {
    await app.listen({ port, host: env.HOST });
  } catch (err: unknown) {
    const error = err as { code?: string };
    if (error.code === "EADDRINUSE") {
      const fallbackPort = port === 5000 ? 5001 : port + 1;
      console.warn(
        `⚠️  Port ${port} is already in use (e.g. by macOS AirPlay Receiver). Retrying on port ${fallbackPort}...`,
      );
      port = fallbackPort;
      await app.listen({ port, host: env.HOST });
    } else {
      app.log.error(err);
      process.exit(1);
    }
  }

  console.log(`🚀 ShortKing API running at http://localhost:${port}`);
  console.log(`🩺 Health check available at http://localhost:${port}/api/v1/health`);

  const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
  for (const signal of signals) {
    process.on(signal, async () => {
      console.log(`Received ${signal}, closing ShortKing API server gracefully...`);
      await app.close();
      process.exit(0);
    });
  }
}

start();
