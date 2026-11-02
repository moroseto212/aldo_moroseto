// Loader gambar untuk static export di GitHub Pages.
// `images.unoptimized` tidak menerapkan basePath, jadi prefix ditambahkan di sini.
// Lebar/quality diabaikan karena tidak ada server optimasi gambar.
export default function imageLoader({ src }: { src: string }): string {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${src}`;
}
