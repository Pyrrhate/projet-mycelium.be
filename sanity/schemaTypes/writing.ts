import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const richBlock = {
  type: "block" as const,
  styles: [
    { title: "Normal", value: "normal" },
    { title: "H2", value: "h2" },
    { title: "H3", value: "h3" },
    { title: "Citation", value: "blockquote" },
  ],
  lists: [
    { title: "Puce", value: "bullet" },
    { title: "Numérotée", value: "number" },
  ],
};

export const writingType = defineType({
  name: "writing",
  title: "Écrit",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroIllustration",
      title: "Illustration d’en-tête",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "content",
      title: "Contenu",
      type: "array",
      of: [richBlock],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Auteur (membre)",
      type: "reference",
      to: [{ type: "member" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      authorName: "author.name",
      media: "heroIllustration",
    },
    prepare({ title, authorName, media }) {
      return {
        title: title ?? "Sans titre",
        subtitle: authorName ?? "—",
        media,
      };
    },
  },
});
