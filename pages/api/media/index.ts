import { del, list } from "@vercel/blob";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const PAGE_SIZE = 100;

const toMedia = (
  pathname: string,
  url: string,
  requestedDirectory: string
) => {
  const filename = pathname.split("/").pop() || pathname;
  return {
    type: "file" as const,
    id: url,
    filename,
    directory: requestedDirectory || "/",
    src: url,
    thumbnails: {
      "75x75": url,
      "400x400": url,
      "1000x1000": url,
    },
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) {
    return res.status(401).json({ error: "unauthorized" });
  }

  if (req.method === "GET") {
    const directory =
      typeof req.query.directory === "string" ? req.query.directory : "";
    const cursor =
      typeof req.query.cursor === "string" ? req.query.cursor : undefined;
    const limit = req.query.limit
      ? Number(req.query.limit)
      : PAGE_SIZE;

    const prefix = directory ? `${directory.replace(/^\/+|\/+$/g, "")}/` : undefined;

    try {
      const result = await list({ prefix, cursor, limit });
      const items = result.blobs.map((b) => toMedia(b.pathname, b.url, directory));
      return res.status(200).json({
        items,
        nextOffset: result.hasMore ? result.cursor : null,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err?.message || "list failed" });
    }
  }

  if (req.method === "DELETE") {
    const { url } = (req.body || {}) as { url?: string };
    if (!url) return res.status(400).json({ error: "missing url" });
    try {
      await del(url);
      return res.status(200).json({ success: true });
    } catch (err: any) {
      return res.status(500).json({ error: err?.message || "delete failed" });
    }
  }

  res.setHeader("Allow", "GET, DELETE");
  return res.status(405).json({ error: "method not allowed" });
}
