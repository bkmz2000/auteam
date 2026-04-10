import { TinaUserCollection } from "tinacms-authjs/dist/tinacms";
import { defineConfig } from "tinacms";

import { PageCollection } from "./collections/page";
import { TeacherCollection } from "./collections/teacher";
import { CategoryCollection } from "./collections/category";
import { CourseCollection } from "./collections/course";
import { NewsCollection } from "./collections/news";
import { FeedbackCollection } from "./collections/feedback";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
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
