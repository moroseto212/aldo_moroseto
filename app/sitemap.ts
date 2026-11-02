import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { getPostSlugs } from "@/lib/posts";
import { getBuildDate } from "@/lib/time";

// Wajib untuk `output: "export"`: route metadata harus dipaksa statis.
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["", "/tentang", "/layanan", "/portofolio", "/blog", "/kontak"];
  const postSlugs = await getPostSlugs();

  const now = await getBuildDate();

  return [
    ...staticPages.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/portofolio/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...postSlugs.map((slug) => ({
      url: `${site.url}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
