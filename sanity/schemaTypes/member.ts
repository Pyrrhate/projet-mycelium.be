import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/** Métadonnée d’auteur uniquement (pas de page profil publique). */
export const memberType = defineType({
  name: "member",
  title: "Membre",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio courte",
      type: "text",
      rows: 4,
      description: "Visible uniquement dans l’attribution auteur (ex. modale légère).",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", media: "avatar" },
  },
});
