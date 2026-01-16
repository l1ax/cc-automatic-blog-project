import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://yourdomain.com";
  const articles = await getAllArticles();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tagPages: MetadataRoute.Sitemap = [];
  const tagSet = new Set<string>();

  articles.forEach((article) => {
    article.tags?.forEach((tag) => {
      if (!tagSet.has(tag)) {
        tagSet.add(tag);
        tagPages.push({
          url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}`,
          lastModified: new Date(article.date),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        });
      }
    });
  });

  return [...staticPages, ...articlePages, ...tagPages];
}
