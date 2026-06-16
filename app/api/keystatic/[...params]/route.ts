import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.config";
import { serialize } from "cookie";
import { webcrypto } from "node:crypto";

const { GET: ksGET, POST: ksPOST } = makeRouteHandler({ config });

// Replicates Keystatic's internal HKDF+AES-GCM encryptValue so we can set
// keystatic-gh-refresh-token in the same format Keystatic expects to decrypt.

const encoder = new TextEncoder();

async function deriveKey(secret: string, salt: Uint8Array) {
  const raw = await webcrypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    "HKDF",
    false,
    ["deriveKey"]
  );
  return webcrypto.subtle.deriveKey(
    { name: "HKDF", salt, hash: "SHA-256", info: new Uint8Array(0) },
    raw,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
}

function base64UrlEncode(bytes: Uint8Array): string {
  const bin = Array.from(bytes, (b) => String.fromCodePoint(b)).join("");
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

async function encryptValue(value: string, secret: string): Promise<string> {
  const salt = webcrypto.getRandomValues(new Uint8Array(16));
  const iv = webcrypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(secret, salt);
  const enc = await webcrypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(value)
  );
  const full = new Uint8Array(16 + 12 + enc.byteLength);
  full.set(salt);
  full.set(iv, 16);
  full.set(new Uint8Array(enc), 28);
  return base64UrlEncode(full);
}

// GitHub OAuth Apps without "Expiring user authorization tokens" omit
// expires_in / refresh_token from the token response. Keystatic's built-in
// handler strictly requires those fields and throws "Authorization failed".
// This wrapper calls GitHub's token endpoint first; if the response lacks
// expiry fields it synthesises them so Keystatic's cookie format is satisfied.
async function handleOAuthCallback(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code) return new Response("Bad Request", { status: 400 });

  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID!;
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET!;
  const secret = process.env.KEYSTATIC_SECRET!;

  const tokenUrl = new URL("https://github.com/login/oauth/access_token");
  tokenUrl.searchParams.set("client_id", clientId);
  tokenUrl.searchParams.set("client_secret", clientSecret);
  tokenUrl.searchParams.set("code", code);

  const tokenRes = await fetch(tokenUrl, {
    method: "POST",
    headers: { Accept: "application/json" },
  });
  const data = (await tokenRes.json()) as Record<string, unknown>;

  if (!tokenRes.ok || data.error || typeof data.access_token !== "string") {
    return new Response(`Authorization failed: ${JSON.stringify(data)}`, {
      status: 401,
    });
  }

  const accessToken = data.access_token as string;
  // Non-expiring tokens lack these fields — synthesise them.
  const expiresIn =
    typeof data.expires_in === "number" ? data.expires_in : 30 * 24 * 3600;
  const refreshToken =
    typeof data.refresh_token === "string" ? data.refresh_token : accessToken;
  const refreshExpiresIn =
    typeof data.refresh_token_expires_in === "number"
      ? data.refresh_token_expires_in
      : 180 * 24 * 3600;

  const encryptedRefresh = await encryptValue(refreshToken, secret);

  const base = { sameSite: "lax" as const, secure: true, path: "/" };
  const setCookies = [
    serialize("keystatic-gh-access-token", accessToken, {
      ...base,
      maxAge: expiresIn,
      expires: new Date(Date.now() + expiresIn * 1000),
    }),
    serialize("keystatic-gh-refresh-token", encryptedRefresh, {
      ...base,
      httpOnly: true,
      maxAge: refreshExpiresIn,
      expires: new Date(Date.now() + refreshExpiresIn * 1000),
    }),
  ];

  const ksPathRegex =
    /^branch\/[^]+(\/collection\/[^/]+(|\/(create|item\/[^/]+))|\/singleton\/[^/]+)?$/;
  const from =
    state && state !== "close" && ksPathRegex.test(state) ? `/${state}` : "";

  const res = new Response(null, {
    status: 302,
    headers: { Location: `/keystatic${from}` },
  });
  setCookies.forEach((c) => res.headers.append("Set-Cookie", c));
  return res;
}

async function GET(req: Request): Promise<Response> {
  const path = new URL(req.url).pathname.replace(/^\/api\/keystatic\/?/, "");
  if (path === "github/oauth/callback") return handleOAuthCallback(req);
  return ksGET(req);
}

export { GET, ksPOST as POST };
