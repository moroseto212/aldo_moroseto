import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
};

export type Post = PostMeta & {
  content: string;
};

const postsDirectory = path.join(process.cwd(), "content", "blog");

function buildMeta(slug: string, raw: string): PostMeta {
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    category: String(data.category ?? "Umum"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime: `${Math.max(1, Math.round(stats.minutes))} menit baca`,
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(postsDirectory)) return [];

  const files = fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"));

  return files
    .map((file) => buildMeta(file.replace(/\.mdx$/, ""), fs.readFileSync(path.join(postsDirectory, file), "utf8")))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostSlugs(): Promise<string[]> {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);

  return { ...buildMeta(slug, raw), content };
}
