# Film page — align header block with Hero

## Context

`utopia-pontoise` scrapes the Utopia cinema in Saint-Ouen l'Aumône. The homepage
(`Home.tsx` / `Hero.tsx`) just got a full visual redesign. The film detail page
(`Film.tsx` / `MovieDetail.tsx`) still carries the previous design's spacing and
type scale for its top "poster + title + credits" block, so it reads as a
different site once you click into a film.

This is the first of three sequential sub-projects for the film page work:

1. **This spec** — align the film page's header block with `Hero.tsx`.
2. Backend performance — make homepage and film-page data load near-instantly.
3. A themed loading screen shown on first site load while data fetches.

Sub-projects 2 and 3 are out of scope here and will get their own specs.

## Scope

In scope: the top block of `MovieDetail.tsx` (poster, "Prochaine séance" mini
block, eyebrow, title, credits grid) and the matching `LoadingSkeleton` in
`Film.tsx`.

Out of scope: Synopsis, Bande-annonce, and Séances sections further down the
page — their structure and `py-[77px]` rhythm already match the rest of the
site and are left untouched.

## Design

Reuse `Hero.tsx`'s exact layout and breakpoint spacing for the header block,
instead of the film page's current independent values:

- Outer grid: `grid grid-cols-1 lg:grid-cols-[480px_1fr] border-b border-ink/10 px-4 lg:px-8`
  (was horizontal padding split unevenly between the two columns).
- Poster column: `lg:pr-8 pt-8 lg:py-16 flex flex-col gap-3.5`. The poster
  wrapper switches from width-based sizing (`max-w-[280px] sm:max-w-[420px] lg:max-w-none`)
  to Hero's height-based responsive crop:
  `lg:max-w-none mx-auto w-full [&_img]:h-[200px] mobileWide:[&_img]:h-[350px] md:[&_img]:h-[550px] lg:[&_img]:h-full`.
  `PosterFrame` itself is unchanged (already `object-cover`).
- "Prochaine séance" block stays under the poster, unchanged in content —
  only its spacing shifts along with the parent column's new padding.
- Text column: `wide:px-0 py-8 lg:py-16 flex flex-col gap-6`.
  - New eyebrow above the title, mirroring Hero's "Film du jour":
    `<Eyebrow size="mini" className="tracking-[0.2em]">À l'affiche</Eyebrow>`.
    Today the film page has no eyebrow here at all.
  - Title: `font-archivo text-[64px] md:text-[102px] leading-[0.9] tracking-[-0.03em] uppercase`
    (was `text-[48px] sm:text-[62px]`) — same scale as Hero for visual parity
    between homepage and film page.
  - Credits grid: `grid grid-cols-[auto_1fr] gap-x-[22px] gap-y-4 text-lg leading-relaxed`
    (was `gap-y-1 text-note`), reusing the same `InfoField` rows.
  - Badges (`version`, `duration`, `country · year`, `genre`): unchanged,
    still `variant="outline"` — no accent badge here, since (per product
    decision) the next showtime stays in its own block under the poster
    rather than folding into the badge row like Hero's showtime badge does.

`LoadingSkeleton` in `Film.tsx` is updated to mirror this new structure and
sizing 1:1, so the loading state doesn't jump when real data arrives.

## Testing

Visual/manual only: run the dev server, open `/film?...` for a movie with and
without a poster image, and check the layout at mobile (`<450px`),
`mobileWide` (426–767px), `md`, and `lg`+ breakpoints against the equivalent
Hero breakpoints on `/`.
