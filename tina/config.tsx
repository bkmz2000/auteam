import { TinaUserCollection, UsernamePasswordAuthJSProvider } from "tinacms-authjs/dist/tinacms";
import { defineConfig, LocalAuthProvider } from "tinacms";

import { PageCollection } from "./collections/page";
import { TeacherCollection } from "./collections/teacher";
import { CategoryCollection } from "./collections/category";
import { CourseCollection } from "./collections/course";
import { NewsCollection } from "./collections/news";
import { FeedbackCollection } from "./collections/feedback";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main";

export default defineConfig({
  contentApiUrlOverride: "/api/tina/gql",
  authProvider: isLocal ? new LocalAuthProvider() : new UsernamePasswordAuthJSProvider(),
  branch,
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
    collections: [
      TinaUserCollection,
      PageCollection,
      TeacherCollection,
      CategoryCollection,
      CourseCollection,
      NewsCollection,
      FeedbackCollection,
    ],
  },
});
