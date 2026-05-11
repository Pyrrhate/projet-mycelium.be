import { groq } from "next-sanity";

const AUTHOR = "author->{ _id, name, bio, avatar }";

/** 3 prochains événements à partir de maintenant */
export const upcomingEventsQuery = groq`
  *[_type == "event" && dateTime(date) >= dateTime(now())] | order(date asc)[0...3] {
    _id,
    title,
    date,
    location,
    description,
    coverImage
  }
`;

/** Flux chronologique inverse (récent en premier) */
export const billetsFluxQuery = groq`
  *[_type == "billet"] | order(publishedAt desc)[0...24] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    content,
    ${AUTHOR},
    "previewText": pt::text(content),
    "firstImage": content[_type == "bodyImage"][0]{
      image,
      alt,
      caption
    },
    "firstVideo": content[_type == "bodyVideo"][0]{
      url,
      caption
    },
    "contentLength": count(content)
  }
`;

export const billetSlugsQuery = groq`
  *[_type == "billet" && defined(slug.current)]{"slug": slug.current}
`;

export const billetBySlugQuery = groq`
  *[_type == "billet" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    content,
    ${AUTHOR}
  }
`;
