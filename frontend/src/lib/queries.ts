export const POSTS_QUERY = `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  readingTime,
  featuredPost,
  featuredImage { asset, alt },
  "author": author->{ name, "slug": slug.current, photo },
  "categories": categories[]->{ name, "slug": slug.current }
}`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  body,
  excerpt,
  publishedAt,
  updatedAt,
  readingTime,
  coverImage { asset, alt },
  featuredImage { asset, alt },
  "author": author->{ name, "slug": slug.current, bio, photo, role, socialLinks },
  "categories": categories[]->{ name, "slug": slug.current },
  "tags": tags[]->{ name, "slug": slug.current },
  seo,
  "relatedPosts": *[
    _type == "post" &&
    !(_id in path("drafts.**")) &&
    slug.current != $slug &&
    count(categories[@->slug.current == ^.^.categories[]->slug.current]) > 0
  ] | order(publishedAt desc) [0...3] {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readingTime,
    "featuredImage": featuredImage { asset, alt }
  }
}`;

export const SLUGS_QUERY = `*[_type == "post" && !(_id in path("drafts.**"))]{ "slug": slug.current }`;

export const AUTHOR_QUERY = `*[_type == "author" && slug.current == $slug][0] {
  name,
  "slug": slug.current,
  photo,
  bio,
  role,
  socialLinks,
  "posts": *[_type == "post" && references(^._id) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    featuredImage { asset, alt }
  }
}`;

export const AUTHORS_QUERY = `*[_type == "author"]{ name, "slug": slug.current }`;