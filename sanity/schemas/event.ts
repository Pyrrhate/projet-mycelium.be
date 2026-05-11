import { CalendarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Exposition / Événement",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date & heure",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Lieu",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
          ],
          lists: [{ title: "Puce", value: "bullet" }],
        },
      ],
    }),
    defineField({
      name: "coverImage",
      title: "Visuel",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", date: "date", media: "coverImage" },
    prepare({ title, date, media }) {
      return {
        title: title ?? "Sans titre",
        subtitle: date ? new Date(String(date)).toLocaleString("fr-BE") : "",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Date",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
});
