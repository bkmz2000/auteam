export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Pass ?code=... from a GitHub OAuth redirect", { status: 400 });
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

  const body = await res.text();

  return new Response(
    JSON.stringify({
      status: res.status,
      ok: res.ok,
      clientIdLength: clientId.length,
      clientIdLast4: clientId.slice(-4),
      clientSecretLength: clientSecret.length,
      clientSecretLast4: clientSecret.slice(-4),
      githubResponse: body,
    }, null, 2),
    { headers: { "content-type": "application/json" } }
  );
}
