# SHIFT Interiors — Interactive Concept Demo

A clickable, front-end concept for the **builtbyshift.ca** redesign, prepared by **High Moral Agency**.
It shows how the new black-and-white editorial direction, the "shift" motion language, and the
key features from the Scope of Work look and feel in a real browser — before anything is built in Squarespace.

> **This is a design prototype, not the production site.** Copy marked "demo" / "sample" is illustrative
> and to be replaced with Shift's real content. Photography and brand logos are Shift's own, pulled from
> the current live site for the mockup.

## View it

**Live (GitHub Pages):** enable Pages on this repo (Settings → Pages → Deploy from branch → `main` / root),
then open the published URL.

**Locally:** it's plain static HTML — no build step.

```bash
python -m http.server 8091
# then open http://127.0.0.1:8091
```

## Pages

| Page | File | Highlights |
| --- | --- | --- |
| Home | `index.html` | Animated SHIFT loader, image hero, Family of Brands marquee, featured work, Walls & PODs block, drag-scroll awards |
| Who We Are | `who-we-are.html` | Owners (Wendy & Steven), mission, "What We Do" process, team, brand grid |
| Our Work & Furniture | `our-work.html` | Multi-tag filterable gallery + problem→solution case studies |
| Walls & PODs | `walls-pods.html` | Dedicated "call us first" treatment for ~50% of the business |
| Industry News | `news.html` | Native-blog-style layout with featured + grid posts |
| Contact | `contact.html` | Form (routes to hello@builtbyshift.ca on launch) + booking placeholder |

## What's demonstrated (mapped to the Scope of Work)

- **Black & white editorial system** with a single accent used sparingly — try the **Demo controls**
  (bottom-right) to swap the accent live, including the "cool grey" option.
- **Animated dynamic SHIFT logo loader** and a wordmark that "shifts" on hover *(Squarespace: custom code)*.
- **Button colour-splash** on hover/click *(custom code)*.
- **Slide / "shift" scroll reveals** and image hover overlays *(native + custom)*.
- **Gallery with multi-tag filtering** *(Squarespace: filter plugin)* — fully working here.
- **Case studies**, **dedicated Walls & PODs page**, **blog-style news**, **contact + booking**.
- **Awards horizontal / drag scroll showcase** *(custom code)*.
- Fully **responsive** with a mobile drawer nav; respects `prefers-reduced-motion`.

## Notes for the build

- Everything is native HTML/CSS/JS so the interactions translate cleanly to Squarespace 7.1
  (native features + code injection + a gallery filter plugin, exactly as the scope describes).
- Real placeholders to swap: owner bios, team photos/roles, confirmed awards, real case-study copy,
  final tagline decision ("Get Shift Done"), and the long-form brand video for the hero.

---

*Built by High Moral Agency · Fonts: Archivo + Inter (Google Fonts) · No tracking, no dependencies.*
