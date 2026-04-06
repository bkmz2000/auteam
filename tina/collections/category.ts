import type { Collection } from "tinacms";

export const CategoryCollection: Collection = {
  name: "category",
  label: "Categories",
  path: "content/categories",
  format: "md",
  fields: [
    { type: "string", name: "name", label: "Name", required: true },
    { type: "string", name: "slug", label: "Slug", required: true },
    { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
    {
      type: "object",
      name: "icon",
      label: "Icon",
      fields: [
        { type: "string", name: "svg", label: "SVG Icon" },
        { type: "string", name: "name", label: "Icon Name" },
      ],
    },
    { type: "number", name: "order", label: "Order" },
  ],
};
