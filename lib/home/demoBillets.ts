import type { BilletFluxItem, MemberAuthor } from "@/types/sanity";

const will: MemberAuthor = {
  _id: "will-de-canvas",
  name: "Will De Canvas",
};

/** Billets factices pour stabiliser l’UI tant que le flux Sanity est vide (titres sémantiques, pas de « Test »). */
export const DEMO_BILLETS: BilletFluxItem[] = [
  {
    _id: "demo-flux-texte-pur",
    title: "Note d’intention sur la lumière",
    slug: "demo-intention-lumiere",
    publishedAt: "2026-01-08T10:00:00.000Z",
    author: will,
    isStaticDemo: true,
    previewLayout: "text-long",
    previewText:
      "Ce qui nous rassemble, ce n’est pas la même technique mais la même attention portée au visible. La lumière devient fil conducteur — douce, oblique, presque accidentelle — entre l’œil qui fixe et la surface qui répond. Nous tenons cette note comme on tient une promesse : explorer sans clore, laisser l’image respirer avant qu’elle ne devienne exposition.",
  },
  {
    _id: "demo-flux-photo-seule",
    title: "WIP — sculpture en métal",
    slug: "demo-sculpture-metal",
    publishedAt: "2026-01-10T14:30:00.000Z",
    author: will,
    isStaticDemo: true,
    previewLayout: "image-hero",
    demoImageUrl:
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=900&q=80",
    demoImageAlt: "Forme organique sombre, travail du métal en cours",
    previewText: null,
  },
  {
    _id: "demo-flux-mixte",
    title: "Un moment de symbiose",
    slug: "demo-symbiose",
    publishedAt: "2026-01-12T09:15:00.000Z",
    author: will,
    isStaticDemo: true,
    previewLayout: "mixed",
    previewText:
      "Entre deux mains qui passent le même outil, entre deux phrases qui se répondent sans se copier : une symbiose. Rien de spectaculaire — un geste partagé, un silence convenu. Ce billet relie texte et matière comme le mycélium relie deux racines invisibles.",
    demoImageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80",
    demoImageAlt: "Sous-bois, lumière filtrée entre les troncs",
  },
  {
    _id: "demo-flux-video",
    title: "Constellation mobile — aperçu",
    slug: "demo-constellation-mobile",
    publishedAt: "2026-01-14T16:45:00.000Z",
    author: will,
    isStaticDemo: true,
    previewLayout: "video-hero",
    demoEmbedVideoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    previewText:
      "Fragment d’essai : mouvements lents, suspension et contre-poids. Une constellation qui n’est pas encore fixée au mur.",
  },
];
