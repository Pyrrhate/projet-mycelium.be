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

export type ArtworkCard = {
  _id: string;
  title: string;
  slug: string;
  mainImage?: SanityImageAsset;
  mainVideoUrl?: string | null;
  description?: string;
  author?: MemberAuthor | null;
};

export type ArtworkDetail = ArtworkCard & {
  gallery?: SanityImageAsset[];
  _createdAt?: string;
};

export type WritingCard = {
  _id: string;
  title: string;
  slug: string;
  heroIllustration?: SanityImageAsset;
  previewText?: string | null;
  author?: MemberAuthor | null;
};

export type WritingDetail = {
  _id: string;
  title: string;
  slug: string;
  heroIllustration?: SanityImageAsset;
  content?: PortableTextBlock[];
  _createdAt?: string;
  author?: MemberAuthor | null;
};
