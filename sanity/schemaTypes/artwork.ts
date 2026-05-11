import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const artworkType = defineType({
  name: "artwork",
  title: "Réalisation",
  type: "document",
  icon: ImageIcon,
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
      name: "mainImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "mainVideo",
      title: "Vidéo principale (fichier)",
      type: "file",
      options: {
        accept: "video/*",
      },
      description: "Si renseignée, peut servir de média principal à côté ou à la place de l’image.",
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "author",
      title: "Auteur (membre)",
      type: "reference",
      to: [{ type: "member" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  validation: (Rule) =>
    Rule.custom((_, context) => {
      const doc = context.document as
        | { mainImage?: unknown; mainVideo?: unknown }
        | undefined;
      if (!doc?.mainImage && !doc?.mainVideo) {
        return "Ajoutez une image principale ou une vidéo.";
      }
      return true;
    }),
  preview: {
    select: {
      title: "title",
      authorName: "author.name",
      media: "mainImage",
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
