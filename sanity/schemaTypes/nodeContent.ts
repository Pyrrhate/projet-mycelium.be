import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const nodeContentType = defineType({
  name: "nodeContent",
  title: "Nœud de contenu",
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
      name: "content",
      title: "Contenu",
      type: "array",
      of: [
        {
          type: "block",
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
        },
      ],
    }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "author",
      title: "Membre (auteur)",
      type: "reference",
      to: [{ type: "member" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Étiquettes",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    select: {
      title: "title",
      authorName: "author.name",
      media: "mainImage",
    },
    prepare({ title, authorName, media }) {
      return {
        title: title ?? "Sans titre",
        subtitle: authorName ? `Par ${authorName}` : "Aucun auteur",
        media,
      };
    },
  },
});
