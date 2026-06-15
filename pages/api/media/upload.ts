import { put } from "@vercel/blob";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export const config = { api: { bodyParser: false } };

const collectBody = (req: NextApiRequest): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method not allowed" });
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return res.status(401).json({ error: "unauthorized" });

  const pathname =
    typeof req.query.pathname === "string" ? req.query.pathname : "";
  if (!pathname) return res.status(400).json({ error: "missing pathname" });

  const body = await collectBody(req);
  const contentType =
    req.headers["content-type"] || "application/octet-stream";

  try {
    const blob = await put(pathname, body, { access: "public", contentType });
    return res.status(200).json({ url: blob.url });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || "upload failed" });
  }
}
