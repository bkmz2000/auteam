import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from "tinacms-authjs";

import databaseClient from "../../../tina/__generated__/databaseClient";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

let handler: any;
try {
  const authOptions = TinaAuthJSOptions({
    databaseClient,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  handler = TinaNodeBackend({
    authProvider: isLocal
      ? LocalBackendAuthProvider()
      : AuthJsBackendAuthProvider({ authOptions }),
    databaseClient,
  });
} catch (e: any) {
  console.error("TinaNodeBackend init error:", e?.message, e?.stack);
  handler = (_req: any, res: any) =>
    res.status(500).json({ initError: e?.message, stack: e?.stack });
}

export default (req: any, res: any) => handler(req, res);
