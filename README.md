# VTUBER FORGE — Alat Gambar Digital

Editor 3D karakter VTuber berbasis Next.js + React Three Fiber + Supabase, disiapkan untuk deployment Vercel.

## Konsep
Bukan Blender penuh. Fokusnya adalah **desain grafis karakter VTuber**: bentuk kepala, rambut, mata, badan, aksesori, warna, skala, visibility, orbit camera, dan fondasi untuk paint/rig/texture.

## Jalankan
1. Salin `.env.example` menjadi `.env.local`.
2. Isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
3. Jalankan `npm install`.
4. Jalankan `npm run dev`.

Password studio awal: `123456789`. Untuk produksi, pindahkan password ke environment variable server dan jangan mengandalkan password client-side.

## Supabase
Aktifkan Anonymous Sign-Ins pada Supabase Auth, lalu jalankan `supabase/schema.sql`.

## Vercel
Import repository ini ke Vercel, set environment variables dari `.env.example`, lalu deploy.

## Asset VRM & Sketsa

Versi studio sekarang memakai TypeScript + React + Next.js + Three.js + React Three Fiber + `@pixiv/three-vrm`. Paket `@pixiv/three-vrm` versi 3.5.5 mendukung pemuatan VRM di Three.js. Model dapat diimpor langsung dari komputer dalam format VRM/GLB/GLTF.

Menu **Asset Library** menyediakan contoh karakter dari repositori publik:
- Seed-san dari VRM Consortium (contoh publik/CC0 pada koleksi sample mereka).
- VRM1 Constraint Twist Sample dari pixiv/three-vrm untuk pengujian fitur VRM.

Model contoh dimuat dari URL sumber saat dipilih, sehingga binary besar tidak perlu dimasukkan ke Git repository. Selalu periksa lisensi/izin model sebelum redistribusi atau penggunaan komersial.

Menu **Sketsa** menyediakan canvas gambar ringan dengan brush, eraser, ukuran, opacity, grid, dan gambar referensi. Ini sengaja dibuat sebagai alat konsep, bukan Blender penuh.

Referensi teknis:
- https://github.com/pixiv/three-vrm
- https://github.com/vrm-c/vrm-specification
- https://github.com/M3-org/CharacterStudio
