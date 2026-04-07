import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const COOKIE_NAME = "admin_auth";

function hashPassword(password: string): string {
  const secret = process.env.NEXTAUTH_SECRET || "default-secret-change-me";
  return crypto.createHash("sha256").update(password + secret).digest("hex");
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

  const cookieValue = hashPassword(storedPassword);

  res.setHeader("Set-Cookie", [
    `${COOKIE_NAME}=${cookieValue}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`,
  ]);

  return res.status(200).json({ ok: true });
}
