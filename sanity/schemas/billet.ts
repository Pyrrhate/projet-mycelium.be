import { ComposeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const richBlock = defineArrayMember({
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
  marks: {
    decorators: [
      { title: "Gras", value: "strong" },
      { title: "Italique", value: "em" },
    ],
    annotations: [
      {
        name: "link",
        type: "object",
        title: "Lien",
        fields: [
          {
            name: "href",
            type: "url",
            title: "URL",
          },
        ],
      },
    ],
  },
});

const bodyImage = defineArrayMember({
  type: "object",
  name: "bodyImage",
  title: "Image",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "alt", title: "Texte alternatif", type: "string" }),
    defineField({ name: "caption", title: "Légende", type: "string" }),
  ],
  preview: {
    select: { title: "caption", media: "image" },
    prepare({ title, media }) {
      return { title: title || "Image", media };
    },
  },
});

const bodyVideo = defineArrayMember({
  type: "object",
  name: "bodyVideo",
  title: "Vidéo",
  fields: [
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description:
        "Lien YouTube, Vimeo, ou URL directe vers un fichier vidéo (mp4, etc.)",
      validation: (Rule) => Rule.required().uri({ allowRelative: false }),
    }),
    defineField({ name: "caption", title: "Légende", type: "string" }),
  ],
  preview: {
    select: { title: "url", caption: "caption" },
    prepare({ title, caption }) {
      const u = title ? String(title).slice(0, 48) : "";
      return { title: caption || "Vidéo", subtitle: u ? `${u}…` : "" };
    },
  },
});

export const billetType = defineType({
  name: "billet",
  title: "Billet (flux)",
  type: "document",
  icon: ComposeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      description: "Optionnel — le flux peut être uniquement visuel.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc) => {
          const t = (doc.title as string | undefined)?.trim();
          if (t) return t;
          const p = doc.publishedAt;
          if (p) return `billet-${String(p).slice(0, 10)}`;
          return "billet";
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "reference",
      to: [{ type: "member" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Publié le",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "content",
      title: "Contenu hybride",
      type: "array",
      of: [richBlock, bodyImage, bodyVideo],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      authorName: "author.name",
      publishedAt: "publishedAt",
    },
    prepare({ title, authorName, publishedAt }) {
      const d = publishedAt
        ? new Date(String(publishedAt)).toLocaleDateString("fr-BE")
        : "";
      return {
        title: title?.trim() || "Sans titre",
        subtitle: [authorName, d].filter(Boolean).join(" · "),
      };
    },
  },
  orderings: [
    {
      title: "Publication (récent)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
