import type { NextApiRequest, NextApiResponse } from "next";

const COOKIE_NAME = "admin_auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { password } = req.body;
  const storedPassword = process.env.TINA_ADMIN_PASSWORD;

  if (!storedPassword) {
    console.error("TINA_ADMIN_PASSWORD is not set");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  if (password !== storedPassword) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const secret = process.env.NEXTAUTH_SECRET || "default-secret-change-me";
  const cookieValue = await hashPassword(storedPassword + secret);

  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${cookieValue}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`
  );

  return res.status(200).json({ ok: true });
}

async function hashPassword(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
