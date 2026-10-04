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