const siteUrl = "https://erez1980.github.io/secherut-amiti";
export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
