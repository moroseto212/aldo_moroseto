import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import PostRow from "@/components/blog/PostRow";
import CtaSection from "@/components/sections/CtaSection";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tulisan seputar performa web, desain antarmuka, animasi, dan pengembangan website — ditulis dari pengalaman proyek nyata.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <PageHero
        label="Blog"
        title="Catatan dari lapangan"
        description="Tulisan tentang performa, desain, animasi, dan teknologi web — berdasarkan pengalaman mengerjakan proyek nyata, bukan teori semata."
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <span className="label-mono text-faint">Arsip tulisan</span>
            <span className="label-mono text-faint">
              {String(posts.length).padStart(2, "0")} catatan
            </span>
          </div>

          {posts.length === 0 ? (
            <p className="mt-8 text-sm text-faint">Belum ada artikel. Silakan kembali lagi nanti.</p>
          ) : (
            <div>
              {posts.map((post, index) => (
                <PostRow key={post.slug} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaSection
        title="Butuh artikel atau konten teknis?"
        description="Saya juga menulis dokumentasi, studi kasus, dan artikel teknis untuk brand dan tim produk."
      />
    </>
  );
}
