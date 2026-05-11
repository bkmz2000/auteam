import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from "tinacms-authjs";

import databaseClient from "../../../tina/__generated__/databaseClient";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const authOptions = TinaAuthJSOptions({
  databaseClient,
  secret: process.env.NEXTAUTH_SECRET!,
});

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({ authOptions }),
  databaseClient,
});

export default async (req: any, res: any) => {
  try {
    await handler(req, res);
  } catch (e: any) {
    console.error("TinaNodeBackend error:", e?.message, e?.stack);
    res.status(500).json({ error: e?.message, stack: e?.stack });
  }
};
