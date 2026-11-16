This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy ke Vercel

Situs ini di-export statis (`output: "export"`) dan diterbitkan otomatis oleh
Vercel setiap kali `master` di-push.

Alamat resmi: `https://aldomoroseto.my.id`

**Sekali saja, di dashboard Vercel:**

1. **Add New → Project → Import** repo GitHub ini.
2. **Settings → Environment Variables → New:**
   - Name: `NEXT_PUBLIC_WEB3FORMS_KEY`
   - Value: access key dari [web3forms.com](https://web3forms.com)
3. **Settings → Domains → Add** `aldomoroseto.my.id` (tambahkan juga
   `www.aldomoroseto.my.id` dengan redirect ke domain utama).
4. Salin nilai DNS yang ditampilkan Vercel ke panel Domainesia:
   `A` untuk apex dan `CNAME` untuk `www`. Jangan ubah record MX/TXT email.

**Sekali saja, matikan hosting lama:**

5. Repo GitHub → **Settings → Pages → Source: None / Unpublish site**.
   Setelah ini `moroseto212.github.io/aldo_moroseto` tidak lagi aktif.

Catatan:

- `NEXT_PUBLIC_BASE_PATH` hanya dipakai saat situs masih di GitHub Pages
  (sub-folder). Di Vercel variabel ini kosong, jadi situs disajikan dari root
  `/`. Setelah Pages dimatikan, `basePath` bisa dihapus dari `next.config.ts`.
- Karena situs statis, optimasi gambar Next.js diganti loader kustom
  (`lib/image-loader.ts`) yang menyajikan berkas asli dari `public/`.
  Jaga ukuran berkas di `public/` tetap kecil.
- Form kontak tetap berfungsi karena dikirim langsung dari browser pengunjung
  ke Web3Forms. Access key harus tersedia saat build, bukan saat runtime.
- Semua `<Link>` memakai `prefetch={false}`: prefetch RSC butuh server, jadi di
  static export permintaannya hanya menghasilkan 404.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
