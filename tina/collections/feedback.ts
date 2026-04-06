import type { Collection } from "tinacms";

export const FeedbackCollection: Collection = {
  name: "feedback",
  label: "Feedback",
  path: "content/feedback",
  format: "md",
  fields: [
    { type: "string", name: "name", label: "Name", required: true },
    { type: "string", name: "body", label: "Review", ui: { component: "textarea" } },
    {
      type: "object",
      name: "rating",
      label: "Rating",
      fields: [
        { type: "number", name: "general", label: "General" },
        { type: "number", name: "professionalism", label: "Professionalism" },
        { type: "number", name: "recommend", label: "Recommend" },
      ],
    },
    { type: "string", name: "relation", label: "Relation (parent/student)" },
    { type: "datetime", name: "date", label: "Date" },
  ],
};
