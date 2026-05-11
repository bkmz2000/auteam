import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

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

  const body = req.body as HandleUploadBody;
  try {
    const jsonResponse = await handleUpload({
      body,
      request: req as unknown as Request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/*"],
        addRandomSuffix: false,
      }),
      onUploadCompleted: async () => {
        /* no-op */
      },
    });
    return res.status(200).json(jsonResponse);
  } catch (err: any) {
    return res.status(400).json({ error: err?.message || "upload failed" });
  }
}
