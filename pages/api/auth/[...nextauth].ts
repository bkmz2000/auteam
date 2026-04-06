import NextAuth from "next-auth"
import { TinaAuthJSOptions } from "tinacms-authjs"
import databaseClient from "../../../tina/__generated__/databaseClient"

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true"
const secret = process.env.NEXTAUTH_SECRET!

export default NextAuth(
  TinaAuthJSOptions({
    databaseClient,
    secret,
    ...(isLocal ? {} : { providers: [] }),
  })
)
