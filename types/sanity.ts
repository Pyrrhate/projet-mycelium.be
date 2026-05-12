import type { PortableTextBlock } from "@portabletext/types";

export type SanityImageAsset = {
  _type?: "image";
  asset?: { _ref?: string; _id?: string; url?: string };
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type MemberAuthor = {
  _id: string;
  name: string;
  bio?: string;
  avatar?: SanityImageAsset;
};

export type EventCard = {
  _id: string;
  title: string;
  date: string;
  location: string;
  description?: PortableTextBlock[];
  coverImage?: SanityImageAsset;
};

/** Bloc hybride dans un billet */
export type BilletBodyImage = {
  _type: "bodyImage";
  _key?: string;
  image: SanityImageAsset;
  alt?: string;
  caption?: string;
};

export type BilletBodyVideo = {
  _type: "bodyVideo";
  _key?: string;
  url: string;
  caption?: string;
};

export type BilletContentItem =
  | PortableTextBlock
  | BilletBodyImage
  | BilletBodyVideo;

export type FluxVariant =
  | "image-hero"
  | "video-hero"
  | "image-featured"
  | "text-long"
  | "mixed";

export type BilletFluxItem = {
  _id: string;
  title: string | null;
  slug: string;
  publishedAt: string;
  content?: BilletContentItem[];
  author?: MemberAuthor | null;
  previewText?: string | null;
  firstImage?: {
    image: SanityImageAsset;
    alt?: string;
    caption?: string;
  } | null;
  firstVideo?: { url: string; caption?: string } | null;
  contentLength?: number;
  /** Démonstration locale : pas de lien vers une page billet */
  isStaticDemo?: boolean;
  /** Force la variante d’affichage (ex. jeux d’exemple en dur) */
  previewLayout?: FluxVariant;
  /** Image distante pour démos sans asset Sanity */
  demoImageUrl?: string | null;
  demoImageAlt?: string | null;
  /** Vidéo intégrée pour démo (YouTube / Vimeo / direct) */
  demoEmbedVideoUrl?: string | null;
};

export type BilletDetail = {
  _id: string;
  title: string | null;
  slug: string;
  publishedAt: string;
  content?: BilletContentItem[];
  author?: MemberAuthor | null;
};
