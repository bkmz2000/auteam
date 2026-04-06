import NextAuth from "next-auth"
import { TinaAuthJSOptions } from "tinacms-authjs"
import databaseClient from "../../../tina/__generated__/databaseClient"

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true"

const options = isLocal
  ? {}
  : {
      secret: process.env.NEXTAUTH_SECRET,
      providers: [],
    }

export default NextAuth(TinaAuthJSOptions({ databaseClient, ...options }))
