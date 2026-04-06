import type { Collection } from "tinacms";

export const CourseCollection: Collection = {
  name: "course",
  label: "Courses",
  path: "content/courses",
  format: "md",
  fields: [
    { type: "string", name: "name", label: "Name", required: true },
    { type: "string", name: "slug", label: "Slug", required: true },
    { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
    { type: "string", name: "ageGroup", label: "Age Group" },
    {
      type: "object",
      name: "pricing",
      label: "Pricing",
      fields: [
        { type: "number", name: "pricePerHour", label: "Price Per Hour" },
        { type: "string", name: "currency", label: "Currency" },
      ],
    },
    {
      type: "object",
      name: "format",
      label: "Format",
      fields: [
        { type: "string", name: "type", label: "Type" },
        { type: "number", name: "duration", label: "Duration (minutes)" },
        { type: "number", name: "lessonsPerWeek", label: "Lessons Per Week" },
        { type: "number", name: "minAge", label: "Min Age" },
        { type: "number", name: "maxAge", label: "Max Age" },
        { type: "number", name: "maxStudents", label: "Max Students" },
      ],
    },
    {
      type: "object",
      name: "schedule",
      label: "Schedule",
      fields: [
        { type: "string", name: "days", label: "Days" },
        { type: "string", name: "time", label: "Time" },
      ],
    },
    { type: "string", name: "location", label: "Location" },
    { type: "string", name: "teacherName", label: "Teacher Name" },
    {
      type: "object",
      name: "photo",
      label: "Photo",
      fields: [
        { type: "image", name: "src", label: "Image" },
        { type: "string", name: "alt", label: "Alt Text" },
      ],
    },
    {
      type: "object",
      name: "gallery",
      label: "Gallery",
      list: true,
      fields: [
        { type: "image", name: "src", label: "Image" },
        { type: "string", name: "alt", label: "Alt Text" },
      ],
    },
    { type: "string", name: "body", label: "Content" },
  ],
};
