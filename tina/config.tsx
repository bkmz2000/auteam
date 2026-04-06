import { TinaUserCollection } from "tinacms-authjs/dist/tinacms";
import { defineConfig, LocalAuthProvider } from "tinacms";

import { PageCollection } from "./collections/page";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default defineConfig({
  contentApiUrlOverride: "/api/tina/gql",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  admin: {
    auth: {
      useLocalAuth: isLocal,
    },
  },
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
      static: true,
    },
  },
  schema: {
    collections: [TinaUserCollection, PageCollection],
  },
});