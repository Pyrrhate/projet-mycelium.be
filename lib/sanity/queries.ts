import { groq } from "next-sanity";

/** Jusqu’à 7 membres pour le réseau vitrine */
export const membersWithRecentNodesQuery = groq`
  *[_type == "member"] | order(name asc)[0...7] {
    _id,
    name,
    "slug": slug.current,
    email,
    bio,
    avatar,
    links,
    "recentNodes": *[_type == "nodeContent" && author._ref == ^._id] | order(_updatedAt desc)[0...3] {
      _id,
      title,
      _updatedAt,
      tags
    }
  }
`;

export const memberSlugsQuery = groq`
  *[_type == "member" && defined(slug.current)]{"slug": slug.current}
`;

export const memberBySlugQuery = groq`
  *[_type == "member" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    email,
    bio,
    avatar,
    links,
    "nodes": *[_type == "nodeContent" && author._ref == ^._id] | order(_updatedAt desc) {
      _id,
      title,
      content,
      mainImage,
      tags,
      _updatedAt
    }
  }
`;
