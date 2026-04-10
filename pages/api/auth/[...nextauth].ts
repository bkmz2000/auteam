import { TinaNodeBackend } from "@tinacms/datalayer";
import { AuthJsBackendAuthProvider } from "tinacms-authjs";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import databaseClient from "../../../tina/__generated__/databaseClient";

const authProvider = AuthJsBackendAuthProvider({
  authOptions: {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID || "",
        clientSecret: process.env.GITHUB_SECRET || "",
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret",
  },
});

const handler = TinaNodeBackend({
  authProvider,
  databaseClient,
});

export default (req: any, res: any) => handler(req, res);
