import slugify from "slugify";

export function generateSlug(text: string) {
  const slug = slugify(text, {
    lower: true,
    trim: true,
    strict: true,
  });

  return slug;
}
