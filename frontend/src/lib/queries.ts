export const POSTS_QUERY = `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  readingTime,
  featuredPost,
  featuredImage { asset, alt },
  "author": author->{ name, photo },
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
  "author": author->{ name, bio, photo },
  "categories": categories[]->{ name, "slug": slug.current },
  "tags": tags[]->{ name, "slug": slug.current },
  seo
}`;

export const SLUGS_QUERY = `*[_type == "post" && !(_id in path("drafts.**"))]{ "slug": slug.current }`;