export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Waiting for GitHub OAuth redirect...", { status: 400 });
  }

  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID ?? "(missing)";
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ?? "(missing)";

  const tokenUrl = new URL("https://github.com/login/oauth/access_token");
  tokenUrl.searchParams.set("client_id", clientId);
  tokenUrl.searchParams.set("client_secret", clientSecret);
  tokenUrl.searchParams.set("code", code);

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { Accept: "application/json" },
  });

  const raw = await res.text();
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch { parsed = raw; }

  const html = `<pre style="font:14px monospace;padding:2rem">${JSON.stringify({
    httpStatus: res.status,
    clientIdLength: clientId.length,
    clientIdLast4: clientId.slice(-4),
    clientSecretLength: clientSecret.length,
    clientSecretLast4: clientSecret.slice(-4),
    githubResponse: parsed,
  }, null, 2)}</pre>`;

  return new Response(html, { headers: { "content-type": "text/html" } });
}
