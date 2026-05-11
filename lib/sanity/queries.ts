import { groq } from "next-sanity";

const AUTHOR = "author->{ _id, name, bio, avatar }";

export const homeArtworksQuery = groq`*[_type == "artwork"] | order(_createdAt desc)[0...12] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  "mainVideoUrl": mainVideo.asset->url,
  description,
  ${AUTHOR}
}`;

export const homeWritingsQuery = groq`*[_type == "writing"] | order(_createdAt desc)[0...6] {
  _id,
  title,
  "slug": slug.current,
  heroIllustration,
  "previewText": pt::text(content),
  ${AUTHOR}
}`;

export const artworkSlugsQuery = groq`
  *[_type == "artwork" && defined(slug.current)]{"slug": slug.current}
`;

export const writingSlugsQuery = groq`
  *[_type == "writing" && defined(slug.current)]{"slug": slug.current}
`;

export const artworkBySlugQuery = groq`*[_type == "artwork" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  "mainVideoUrl": mainVideo.asset->url,
  gallery,
  description,
  _createdAt,
  ${AUTHOR}
}`;

export const writingBySlugQuery = groq`*[_type == "writing" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  heroIllustration,
  content,
  _createdAt,
  ${AUTHOR}
}`;
