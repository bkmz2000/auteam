import type { NextApiRequest, NextApiResponse } from "next";

import databaseClient from "../../tina/__generated__/databaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = String(req.query.u || "tinauser");
  const password = String(req.query.p || "tinarocks");
  try {
    const result = await databaseClient.authenticate({ username, password });
    return res.status(200).json({
      username,
      result,
      hasData: !!result?.data,
      authenticateField: result?.data?.authenticate ?? null,
      errors: result?.errors ?? null,
    });
  } catch (e: any) {
    return res.status(500).json({
      username,
      error: e?.message,
      stack: e?.stack,
    });
  }
}
