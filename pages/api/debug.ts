import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const info: Record<string, any> = {
      node_version: process.version,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? `set (${process.env.NEXTAUTH_SECRET.length} chars)` : "MISSING",
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "MISSING",
      TINA_PUBLIC_IS_LOCAL: process.env.TINA_PUBLIC_IS_LOCAL || "MISSING",
      KV_REST_API_URL: process.env.KV_REST_API_URL ? "set" : "MISSING",
      KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN ? "set" : "MISSING",
      UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ? "set" : "MISSING",
      UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ? "set" : "MISSING",
      GITHUB_PERSONAL_ACCESS_TOKEN: process.env.GITHUB_PERSONAL_ACCESS_TOKEN ? "set" : "MISSING",
      GITHUB_OWNER: process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER || "MISSING",
      GITHUB_REPO: process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG || "MISSING",
    };

    // Try importing tinacms-authjs
    let authJsStatus = "ok";
    try {
      require("tinacms-authjs");
    } catch (e: any) {
      authJsStatus = `FAIL: ${e.message}`;
    }
    info.tinacms_authjs_import = authJsStatus;

    // Try importing datalayer
    let datalayerStatus = "ok";
    try {
      require("@tinacms/datalayer");
    } catch (e: any) {
      datalayerStatus = `FAIL: ${e.message}`;
    }
    info.tinacms_datalayer_import = datalayerStatus;

    res.status(200).json(info);
  } catch (e: any) {
    res.status(500).json({ error: e.message, stack: e.stack });
  }
}
