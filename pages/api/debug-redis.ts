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

    const rawBranch =
      process.env.GITHUB_BRANCH ||
      process.env.VERCEL_GIT_COMMIT_REF ||
      "main";
    const cleanedBranch = rawBranch.replace(/\s/g, "").trim();

    const dbsize = await redis.dbsize();

    const sampled: string[] = [];
    let cursor: string | number = 0;
    let total = 0;
    do {
      const [next, batch] = await redis.scan(cursor, { match: "*", count: 500 });
      cursor = next;
      for (const k of batch) {
        if (sampled.length < 30) sampled.push(k);
      }
      total += batch.length;
      if (total > 5000) break;
    } while (Number(cursor) !== 0);

    // Try to find user data under either namespace
    const tryKeys = [
      `${rawBranch}:user:content/users/index.json`,
      `${cleanedBranch}:user:content/users/index.json`,
      `main:user:content/users/index.json`,
      `${rawBranch}:content/users/index.json`,
      `${cleanedBranch}:content/users/index.json`,
    ];
    const tryResults: Record<string, any> = {};
    for (const k of tryKeys) {
      try {
        tryResults[k] = await redis.get(k);
      } catch (e: any) {
        tryResults[k] = `ERR: ${e?.message}`;
      }
    }

    // Sample some keys that contain "user" via SCAN with match
    let cursor2: string | number = 0;
    const userKeys: string[] = [];
    do {
      const [next, batch] = await redis.scan(cursor2, { match: "*user*", count: 500 });
      cursor2 = next;
      for (const k of batch) userKeys.push(k);
      if (userKeys.length > 50) break;
    } while (Number(cursor2) !== 0);

    res.status(200).json({
      rawBranch,
      rawBranchHex: Buffer.from(rawBranch).toString("hex"),
      cleanedBranch,
      hasTrailingWhitespace: rawBranch !== cleanedBranch,
      dbsize,
      scannedTotal: total,
      sampleKeys: sampled,
      userKeys,
      tryResults,
    });
  } catch (e: any) {
    res.status(500).json({ error: e?.message, stack: e?.stack });
  }
}
