import NextAuth from "next-auth"
import { TinaAuthJSOptions, TinaCredentialsProvider } from "tinacms-authjs"
import databaseClient from "../../../tina/__generated__/databaseClient"

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const handler = NextAuth(
  TinaAuthJSOptions({
    databaseClient,
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret-do-not-use-in-prod",
    providers: isLocal ? [TinaCredentialsProvider({ databaseClient })] : [],
  })
);

export default handler;
