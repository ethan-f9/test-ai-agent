# agent.md — Ethan Portfolio Website

---

## Project Vision

Static portfolio website untuk freelancer full stack developer bernama Ethan.
Target: meyakinkan klien budget-friendly bahwa Ethan adalah pilihan terbaik untuk proyek web mereka.
Positioning utama: **kecepatan delivery**.
Tidak ada backend. Tidak ada CMS. Tidak ada database. Pure static.

---

## Architecture Decisions

- **Static HTML/CSS/JS** — tidak ada framework frontend. Tidak ada React, tidak ada Vue.
- Alasan: portfolio ini tidak butuh reactivity. Menambahkan framework hanya menambah build complexity tanpa manfaat nyata.
- Contact form: tampilan saja, tidak fungsional (sesuai requirement).
- Deployment: static hosting (Netlify / Vercel / GitHub Pages).
- Zero dependencies runtime. Tidak ada jQuery, tidak ada lodash.

---

## Tech Stack

| Layer | Pilihan | Alasan |
|---|---|---|
| Markup | HTML5 semantic | Sederhana, SEO-friendly, cepat |
| Styling | CSS3 custom properties | Zero dependency, kontrol penuh |
| Scripting | Vanilla JS (ES6+) | Tidak ada overhead framework |
| Font | Google Fonts (max 2 font) | Gratis, reliable |
| Icons | SVG inline / Tabler Icons CDN | Ringan, scalable |
| Hosting | Netlify / GitHub Pages | Gratis, fast CDN |
| Animation | CSS keyframes + Intersection Observer | Performa optimal |

---

## Security Rules

- Tidak ada form submission aktif — tidak ada attack surface dari form.
- Tidak ada external script selain Google Fonts dan icon library.
- Tidak ada inline event handler (`onclick` langsung di HTML).
- Semua external resource menggunakan CDN yang terpercaya.
- Meta tags security: `X-Content-Type-Options`, `X-Frame-Options` via Netlify config jika deploy di sana.

---

## Performance Rules

- **Target Lighthouse score: 95+** di semua kategori.
- Images: gunakan WebP, lazy loading native (`loading="lazy"`), ukuran eksplisit (width + height).
- Font: preconnect Google Fonts, `font-display: swap`.
- CSS: satu file, tidak ada render-blocking external CSS.
- JS: defer atau async, tidak ada blocking script.
- Animasi: hanya transform dan opacity (GPU-accelerated). Tidak ada animasi `width`, `height`, `top`, `left`.
- Tidak ada autoplay media.
- Minimal HTTP requests.

---

## Coding Rules

- Gunakan semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- CSS: BEM naming untuk class. Contoh: `.card`, `.card__title`, `.card--featured`.
- JS: gunakan `const` dan `let`, tidak ada `var`. Arrow function untuk callback sederhana.
- Tidak ada kode duplikat. Komponen yang sama gunakan template literal atau loop.
- Komentar hanya untuk logika non-obvious. Tidak ada komentar obvious.
- Indentasi: 2 spasi.

---

## Folder Structure

```
ethan-portfolio/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── projects/
│       │   ├── properti.webp
│       │   ├── elektronik.webp
│       │   └── konsultan.webp
│       └── avatar.webp
├── netlify.toml         (jika deploy Netlify)
└── README.md
```

Tidak ada folder tambahan. Tidak ada `components/`, `utils/`, `lib/` untuk static site sesederhana ini.

---

## Naming Convention

- File: `kebab-case` — `style.css`, `main.js`, `hero-bg.webp`
- CSS class: BEM — `.section-title`, `.project-card`, `.project-card__image`
- JS variable: `camelCase` — `projectCards`, `navToggle`
- HTML id: `kebab-case` — `#about`, `#portfolio`, `#contact`
- Section id harus sama dengan nav anchor — `href="#portfolio"` → `id="portfolio"`

---

## Page Structure (Single Page)

```
index.html
├── <header> — logo/nama + nav
├── <section id="hero"> — tagline + CTA
├── <section id="about"> — profil singkat Ethan
├── <section id="services"> — jasa yang ditawarkan
├── <section id="portfolio"> — 3 dummy projects
├── <section id="testimonials"> — 2-3 testimoni dummy
├── <section id="contact"> — form (tampilan only)
└── <footer> — copyright
```

Satu halaman. Smooth scroll antar section. Tidak ada routing.

---

## Frontend Guidelines

- Mobile-first. Breakpoints: 480px, 768px, 1024px.
- Navigation: hamburger menu di mobile, horizontal di desktop.
- Smooth scroll: `scroll-behavior: smooth` di CSS, fallback JS untuk browser lama.
- Scroll animation: Intersection Observer untuk reveal effect saat scroll.
- Active state: highlight nav item sesuai section yang sedang aktif (scroll spy sederhana).
- Tidak ada carousel/slider library. Jika butuh slider, buat sendiri dengan CSS scroll snap.
- Color scheme: gunakan CSS custom properties untuk seluruh color system.
- Dark mode: opsional — implementasikan jika tidak menambah kompleksitas signifikan.

---

## Component Breakdown

### Hero Section
- Headline: nama + positioning statement
- Sub-headline: value proposition (kecepatan)
- CTA button: anchor ke `#contact`
- Background: subtle geometric atau gradient — tidak ada stock photo

### About Section
- Avatar placeholder (gunakan initials atau geometric shape)
- Bio singkat: 2-3 kalimat, fokus ke keahlian dan kecepatan
- Skills: tag-based list (HTML, CSS, JS, React, Node, dsb)

### Services Section
- 3 service card: Landing Page, E-commerce, Web App
- Setiap card: icon + judul + deskripsi singkat + "harga mulai dari" (opsional)

### Portfolio Section
- 3 project card: Properti, Elektronik, Konsultan
- Setiap card: mockup image + nama project + kategori + deskripsi singkat + tag teknologi
- Tidak ada lightbox. Tidak ada modal. Cukup card yang informatif.

### Testimonials Section
- 2-3 testimoni dummy
- Nama + peran + teks testimoni
- Rating bintang (CSS only)

### Contact Section
- Form fields: Nama, Email, Jenis Project, Pesan
- Submit button: tampilan saja, tidak ada action
- Info kontak alternatif: WhatsApp / Email (bisa placeholder)

---

## API Rules

Tidak ada API. Static site.
Jika di masa depan ingin form aktif: gunakan Netlify Forms atau Formspree — bukan custom backend.

---

## Database Rules

Tidak ada database. Semua data hardcoded di HTML.

---

## Deployment Rules

**Opsi 1 — GitHub Pages (gratis, cocok untuk portfolio):**
1. Push ke repository GitHub
2. Aktifkan GitHub Pages dari branch `main`, folder `/` (root)
3. Custom domain: tambahkan `CNAME` file jika punya domain

**Opsi 2 — Netlify (lebih fleksibel):**
1. Connect repo ke Netlify
2. Build command: kosong (static)
3. Publish directory: `/` (root)
4. Tambahkan `netlify.toml` untuk security headers

```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## Forbidden Practices

- ❌ Jangan install npm/node untuk static site ini
- ❌ Jangan gunakan React, Vue, atau framework apapun
- ❌ Jangan gunakan jQuery
- ❌ Jangan gunakan Bootstrap atau Tailwind CDN — tulis CSS sendiri
- ❌ Jangan gunakan stock photo dari Unsplash tanpa resize/optimize
- ❌ Jangan gunakan `!important` di CSS kecuali override third-party
- ❌ Jangan gunakan inline style di HTML
- ❌ Jangan gunakan `document.write()`
- ❌ Jangan buat file JS terpisah untuk setiap fitur kecil
- ❌ Jangan tambahkan animasi kompleks yang mengorbankan performa
- ❌ Jangan hardcode warna langsung di CSS — gunakan CSS custom properties

---

## AI Coding Behavior Rules

Ketika AI (Claude Code) mengerjakan project ini:

- Mulai dari HTML structure dulu, baru CSS, baru JS
- Tidak menambahkan dependency tanpa alasan eksplisit
- Tidak membuat file yang tidak ada di folder structure di atas
- Selalu prioritaskan mobile view dulu
- Setiap komponen harus bisa berdiri sendiri (tidak bergantung pada urutan CSS)
- Tidak membuat placeholder logic atau TODO comment tanpa implementasi
- Semua gambar harus ada fallback (alt text, atau placeholder CSS)

---

## Clean Code Principles

1. **Readability first** — kode harus bisa dibaca tanpa komentar
2. **DRY** — jangan tulis CSS yang sama dua kali, gunakan class yang reusable
3. **Single responsibility** — setiap section CSS hanya styling section tersebut
4. **Consistency** — naming convention harus konsisten dari awal sampai akhir
5. **Minimal** — jika bisa tanpa JS, jangan pakai JS

---

## Next Step

Lanjut ke **MODE 3 — UI/UX Planning** untuk menentukan visual direction dan membuat prompt Google Stitch.
