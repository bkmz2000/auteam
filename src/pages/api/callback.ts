export const prerender = false;

function renderBody(status: string, content: object) {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>OAuth Callback</title>
</head>
<body>
  <script>
    const receiveMessage = (message) => {
      window.opener.postMessage(
        'authorization:github:${status}:${JSON.stringify(content)}',
        message.origin
      );
      window.removeEventListener("message", receiveMessage, false);
    };
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
    setTimeout(() => window.close(), 100);
  </script>
</body>
</html>`;
  return html;
}

export async function GET({ request, env }: { request: Request; env: Env }) {
  const client_id = env?.GITHUB_CLIENT_ID || import.meta.env.GITHUB_CLIENT_ID;
  const client_secret = env?.GITHUB_CLIENT_SECRET || import.meta.env.GITHUB_CLIENT_SECRET;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'cloudflare-functions-github-oauth-login',
        'accept': 'application/json',
      },
      body: JSON.stringify({ client_id, client_secret, code }),
    });

    const result = await response.json();

    if (result.error) {
      const html = renderBody('error', result);
      return new Response(html, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
        status: 401,
      });
    }

    const token = result.access_token;
    const provider = 'github';
    const html = renderBody('success', { token, provider });

    return new Response(html, {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
      status: 200,
    });
  } catch (error) {
    return new Response(error instanceof Error ? error.message : 'Unknown error', {
      status: 500,
    });
  }
}
