import type { PortableTextBlock } from "@portabletext/types";

export type SanityImageAsset = {
  _type?: "image";
  asset?: { _ref?: string; _id?: string; url?: string };
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type MemberLink = {
  _key?: string;
  label?: string;
  url?: string;
};

export type MemberWithNodes = {
  _id: string;
  name: string;
  slug: string;
  email?: string;
  bio?: string;
  avatar?: SanityImageAsset;
  links?: MemberLink[];
  recentNodes?: {
    _id: string;
    title: string;
    _updatedAt: string;
    tags?: string[];
  }[];
};

export type MemberProfile = {
  _id: string;
  name: string;
  slug: string;
  email?: string;
  bio?: string;
  avatar?: SanityImageAsset;
  links?: MemberLink[];
  nodes?: {
    _id: string;
    title: string;
    content?: PortableTextBlock[];
    mainImage?: SanityImageAsset;
    tags?: string[];
    _updatedAt: string;
  }[];
};
