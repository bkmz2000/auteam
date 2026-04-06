import type { Collection } from "tinacms";

export const NewsCollection: Collection = {
  name: "news",
  label: "News",
  path: "content/news",
  format: "md",
  fields: [
    { type: "string", name: "title", label: "Title", required: true },
    { type: "string", name: "slug", label: "Slug", required: true },
    { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
    {
      type: "object",
      name: "image",
      label: "Image",
      fields: [
        { type: "image", name: "src", label: "Image" },
        { type: "string", name: "alt", label: "Alt Text" },
      ],
    },
    { type: "datetime", name: "date", label: "Date" },
    { type: "string", name: "body", label: "Content" },
  ],
};
