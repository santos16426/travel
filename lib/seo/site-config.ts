function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export const siteConfig = {
  name: "Travel Portfolio",
  description:
    "A personal travel journal: places visited, photos, and stories from the road.",
  locale: "en",
  get url() {
    return getSiteUrl();
  },
} as const;
