import type { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";

const cleanEnv = (val: string | undefined) => {
  const cleaned = val?.replace(/\s/g, "").trim();
  return cleaned && cleaned.length > 0 ? cleaned : undefined;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url =
      cleanEnv(process.env.UPSTASH_REDIS_REST_URL) ||
      cleanEnv(process.env.KV_REST_API_URL) ||
      "";
    const token =
      cleanEnv(process.env.UPSTASH_REDIS_REST_TOKEN) ||
      cleanEnv(process.env.KV_REST_API_TOKEN) ||
      "";
    const redis = new Redis({ url, token });
    const branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";

    let cursor: string | number = 0;
    const matchedKeys: string[] = [];
    const sampleKeys: string[] = [];
    let scanned = 0;
    do {
      const [next, batch] = await redis.scan(cursor, { match: "*", count: 200 });
      cursor = next;
      scanned += batch.length;
      for (const k of batch) {
        if (sampleKeys.length < 10) sampleKeys.push(k);
        if (k.includes("user") || k.includes("users")) matchedKeys.push(k);
      }
      if (scanned > 2000) break;
    } while (Number(cursor) !== 0);

    const records: Record<string, any> = {};
    for (const k of matchedKeys.slice(0, 15)) {
      const v = await redis.get(k);
      records[k] = v;
    }

    res.status(200).json({
      branch,
      keyCount: scanned,
      sampleKeys,
      userKeys: matchedKeys,
      userRecords: records,
    });
  } catch (e: any) {
    res.status(500).json({ error: e?.message, stack: e?.stack });
  }
}
