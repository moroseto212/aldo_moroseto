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

## Deploy ke GitHub Pages

Situs ini di-export statis (`output: "export"`) dan diterbitkan otomatis oleh
GitHub Actions setiap kali `master` di-push.

**Sekali saja, di pengaturan repo:**

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Settings → Secrets and variables → Actions → New repository secret**
   - Name: `NEXT_PUBLIC_WEB3FORMS_KEY`
   - Value: access key dari [web3forms.com](https://web3forms.com)
3. Push ke `master`, lalu pantau tab **Actions**.

URL hasil deploy: `https://moroseto212.github.io/personal-website-aldo_moroseto/`

Catatan:

- `NEXT_PUBLIC_BASE_PATH` diisi otomatis oleh `actions/configure-pages`, jadi
  tidak perlu diatur manual. Di lokal nilainya kosong dan situs berjalan di `/`.
- Karena GitHub Pages tidak punya server, optimasi gambar Next.js diganti loader
  kustom (`lib/image-loader.ts`) yang menyajikan berkas asli dari `public/`.
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
