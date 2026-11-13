// Loader gambar untuk static export di GitHub Pages.
// `images.unoptimized` tidak menerapkan basePath, jadi prefix ditambahkan di sini.
// Width/quality tetap diteruskan sebagai query string supaya Next mengenali loader
// ini mengimplementasikan width; GitHub Pages mengabaikan query dan menyajikan
// berkas asli dari /public.
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${src}?w=${width}&q=${quality ?? 75}`;
}
