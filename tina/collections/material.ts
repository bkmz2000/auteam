import type { Collection } from "tinacms";

export const MaterialCollection: Collection = {
  name: "material",
  label: "Materials",
  path: "content/materials",
  format: "md",
  fields: [
    { type: "string", name: "title", label: "Title", required: true },
    { type: "string", name: "slug", label: "Slug", required: true },
    { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
    { type: "string", name: "body", label: "Content" },
    {
      type: "object",
      name: "attachments",
      label: "Attachments",
      list: true,
      fields: [
        { type: "string", name: "title", label: "Title" },
        { type: "string", name: "url", label: "URL" },
      ],
    },
    { type: "string", name: "tags", label: "Tags" },
    { type: "string", name: "author", label: "Author" },
    { type: "string", name: "publishedDate", label: "Published Date" },
  ],
};