import { redirect, notFound } from "next/navigation";

interface Props {
  params: Promise<{ shortCode: string }>;
}

export default async function RedirectPage({ params }: Props) {
  const { shortCode } = await params;
  const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001").replace(/\/$/, "");

  try {
    const res = await fetch(`${apiBase}/${shortCode}`, {
      method: "GET",
      redirect: "manual",
      cache: "no-store",
    });

    if (res.status === 307 || res.status === 302 || res.status === 301) {
      const location = res.headers.get("location");
      if (location) {
        redirect(location);
      }
    }

    if (res.status === 404) {
      notFound();
    }
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      typeof (err as { digest: unknown }).digest === "string" &&
      (err as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }
  }

  // Fallback redirect directly to backend resolution endpoint
  redirect(`${apiBase}/${shortCode}`);
}
