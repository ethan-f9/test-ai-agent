# design.md — Ethan Portfolio UI/UX Direction

---

## Visual Direction

**Theme:** Clean & Modern  
**Mood:** Professional, trustworthy, conversion-focused  
**Personality:** Efisien, cepat, tidak buang-buang waktu — mencerminkan positioning Ethan  
**Reference feel:** Linear, Stripe, Vercel — bukan agency seni, tapi developer profesional

---

## Color Strategy

```
--color-bg:          #FFFFFF
--color-bg-secondary:#F7F7F7
--color-bg-card:     #FAFAFA
--color-border:      #E5E5E5
--color-text-primary:#0A0A0A
--color-text-muted:  #6B6B6B
--color-accent:      #2563EB   /* biru kuat — trust + tech */
--color-accent-hover:#1D4ED8
--color-tag-bg:      #EFF6FF
--color-tag-text:    #1E40AF
```

Tidak ada gradient mencolok. Warna aksen hanya untuk CTA, link, dan highlight — bukan dekorasi.

---

## Typography Direction

```
Display font : "Plus Jakarta Sans" — modern, sedikit geometric, tidak generik
Body font    : "Inter" — readability optimal untuk konten dense

--font-display: 'Plus Jakarta Sans', sans-serif;
--font-body:    'Inter', sans-serif;

Heading scale:
  H1: 56px / line-height 1.1 / weight 700 (hero only)
  H2: 36px / line-height 1.2 / weight 700
  H3: 20px / line-height 1.4 / weight 600
  Body: 16px / line-height 1.7 / weight 400
  Small/caption: 13px / line-height 1.5 / weight 400
```

---

## Layout Structure

Single page. Scroll vertikal. Tidak ada sidebar.

```
Max content width : 1100px
Horizontal padding: 24px (mobile), 48px (tablet), auto center (desktop)
Section padding   : 96px top/bottom (desktop), 64px (mobile)
Grid system       : CSS Grid — 12 kolom di desktop, 1 kolom di mobile
```

### Section Order & Layout

**1. Header / Nav**
- Sticky, background putih dengan subtle border-bottom saat scroll
- Kiri: nama "Ethan" (semi-bold, bukan logo rumit)
- Kanan: nav links horizontal + CTA button "Hubungi Saya"
- Mobile: hamburger → full-screen overlay menu

**2. Hero**
- Layout: 2 kolom — teks kiri (60%), visual kanan (40%)
- Visual kanan: abstract code snippet atau geometric shape — bukan foto
- Headline: besar, bold, max 6 kata
- Sub-headline: 1-2 kalimat value proposition (kecepatan)
- CTA: 2 button — primary "Lihat Portfolio", secondary "Hubungi Saya"
- Badge kecil di atas headline: "⚡ Fast Delivery" atau similar

**3. About**
- Layout: 2 kolom — avatar kiri (40%), teks kanan (60%)
- Avatar: placeholder circular dengan initials atau geometric pattern
- Teks: bio singkat 2-3 kalimat
- Skills: tag chip horizontal, wrap ke bawah

**4. Services**
- Layout: 3 kolom card di desktop, 1 kolom di mobile
- Setiap card: icon + judul + deskripsi 2 kalimat
- Hover state: subtle lift (box-shadow) + border aksen
- Tidak ada harga — jaga misteri, dorong ke contact

**5. Portfolio**
- Layout: grid 3 kolom di desktop, 1 kolom di mobile
- Setiap card: image mockup (16:9 ratio) + overlay tipis saat hover
- Di bawah image: nama project + kategori (badge) + deskripsi singkat + tech tags
- Tidak ada tombol "lihat demo" — tidak ada link aktif untuk dummy project

**6. Testimonials**
- Layout: 3 kolom di desktop, 1 kolom di mobile
- Card sederhana: quote mark dekoratif + teks + nama + peran
- Tidak ada foto avatar — initials circle saja
- Rating bintang ⭐⭐⭐⭐⭐ di bawah nama

**7. Contact**
- Layout: 2 kolom — info kiri (40%), form kanan (60%)
- Info kiri: kalimat singkat + "Expected response: < 24 jam"
- Form: Nama, Email, dropdown Jenis Project, Textarea Pesan, Submit button
- Submit button: full-width, warna aksen

**8. Footer**
- Minimal: copyright + nama
- Tidak ada social media links (tidak ada yang diminta)

---

## Component Behavior

**Navigation scroll spy:**
- Nav item aktif berubah warna saat section masuk viewport
- Smooth scroll ke section saat nav diklik

**Card hover:**
- `transform: translateY(-4px)` + `box-shadow` lebih dalam
- Transisi 200ms ease
- Border berubah ke warna aksen

**Scroll reveal:**
- Elemen masuk dari bawah (`translateY(24px)` → `translateY(0)`) + fade in
- Delay staggered untuk card dalam satu row
- Intersection Observer, tidak ada library

**Form fields:**
- Focus state: border aksen + subtle glow ring
- Placeholder jelas, label di atas field
- Tidak ada validasi real-time (form tidak aktif)

**CTA Button:**
- Primary: bg aksen + text putih, hover bg aksen-dark
- Secondary: border aksen + text aksen, hover bg ringan
- Border radius: 8px
- Padding: 12px 24px

---

## Interaction Style

- Tidak ada animasi berlebihan
- Micro-interaction hanya pada: hover card, hover button, form focus
- Page load: tidak ada loading screen
- Scroll: smooth, tidak ada parallax berat
- Tidak ada cursor custom

---

## Animation Guideline

```css
/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Card hover */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.08);
}
```

Hanya `transform` dan `opacity`. Tidak ada animasi `width`, `height`, `top`.

---

## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| < 480px | Stack semua ke 1 kolom, font scale turun 20% |
| 480–768px | 2 kolom untuk card, hero stack vertikal |
| 768–1024px | Layout mulai 2-3 kolom, nav horizontal |
| > 1024px | Full desktop layout, max-width 1100px centered |

---

## Accessibility Guideline

- Semua image wajib `alt` attribute
- Kontras warna minimum WCAG AA (4.5:1 untuk body text)
- Form label eksplisit (`<label for="...">`)
- Keyboard navigable: tab order logis
- Focus state visible (tidak di-hide)
- Semantic HTML: heading hierarchy benar (H1 → H2 → H3)
- Nav landmark: `<nav aria-label="Main navigation">`

---

## Prompt Google Stitch

```
Design a clean modern portfolio website for a freelance full stack web developer named Ethan. 

VISUAL STYLE:
- Clean, minimal, professional — inspired by Linear, Vercel, Stripe design language
- White and light gray backgrounds (#FFFFFF, #F7F7F7)
- Strong blue accent color (#2563EB) used sparingly for CTAs and highlights only
- No gradients, no decorative backgrounds — flat surfaces with subtle borders
- Typography: Plus Jakarta Sans for headings (bold, geometric), Inter for body text
- Generous whitespace — sections breathe

PAGE SECTIONS (single page, vertical scroll):

1. STICKY NAV — left: "Ethan" text logo — right: navigation links + "Hubungi Saya" button (blue)

2. HERO — two column layout. Left (60%): small badge "⚡ Fast Delivery", large bold headline "Website Profesional, Selesai Tepat Waktu", subtitle about speed-focused development, two buttons (primary blue + secondary outlined). Right (40%): abstract geometric shape or floating code block visual — NO STOCK PHOTOS.

3. ABOUT — two column. Left: circular avatar placeholder with initials "E". Right: short bio paragraph, horizontal skill tags (HTML, CSS, JS, React, Node.js, etc.)

4. SERVICES — 3 cards in a row. Cards: "Landing Page", "E-Commerce", "Web App". Each card: simple line icon + title + 2-line description. Hover: subtle lift + blue border.

5. PORTFOLIO — 3 project cards grid. Projects: "Properti Idaman" (real estate landing page), "TechMart" (electronics e-commerce), "Konsulta Pro" (consulting company profile). Each card: 16:9 aspect ratio mockup image placeholder + project name + category badge + short description + tech stack tags.

6. TESTIMONIALS — 3 cards. Each: large decorative quote mark, testimonial text, client name, role, 5-star rating. Clean card design.

7. CONTACT — two column. Left: short description + "< 24 jam response time" highlight. Right: contact form (Name, Email, Project Type dropdown, Message textarea, Submit button full-width blue).

8. FOOTER — minimal, centered copyright text only.

DESIGN RULES:
- Mobile-first responsive
- No stock photography — use geometric placeholders or abstract visuals
- Cards use subtle border (1px #E5E5E5) and soft shadow on hover
- All buttons: 8px border radius, 12px/24px padding
- Consistent 96px section padding top/bottom on desktop
- Max content width 1100px centered
- The overall feel: a professional developer who delivers fast — not an art director, not an agency
```

---

## Next Step

Lanjut ke **MODE 4 — Demo Website** untuk membuat prompt Claude Code membangun static demo.
