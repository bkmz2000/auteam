import { TinaNodeBackend } from "@tinacms/datalayer";
import { TinaCloudBackendAuthProvider } from "@tinacms/auth";
import { TinaAuthJSOptions } from "tinacms-authjs";
import NextAuth from "next-auth";

import databaseClient from "../../../tina/__generated__/databaseClient";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

let authHandler: any;

if (isLocal) {
  authHandler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret",
    providers: [],
  });
} else {
  // Tina Cloud mode - use Tina's auth
  authHandler = NextAuth(
    TinaAuthJSOptions({
      databaseClient,
      secret: process.env.NEXTAUTH_SECRET || "fallback-secret",
    })
  );
}

export default authHandler;
