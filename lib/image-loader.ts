// Loader gambar untuk static export.
// Width/quality tetap diteruskan sebagai query string supaya Next mengenali loader
// ini mengimplementasikan width; hosting statis mengabaikan query dan menyajikan
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

  return `${src}?w=${width}&q=${quality ?? 75}`;
}
