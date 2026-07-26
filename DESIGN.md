# DESIGN.md — "A Dancer's Manuscript, Staged"

The design system for bhavyasreepyla.com (v2)

## Design Philosophy

A warm near-black void — alive. The whole site floats over one cursor-reactive
particle canvas (the Glyph Field): drifting star-dust where some particles are
glyphs from the eight scripts of the name reveal; near the cursor they ignite
gold and link with hairlines. This is the Active Theory instinct (the page is a
stage, the visitor's cursor is a stage light) fused with manuscript warmth.

The multilingual scramble of the name reveal is not an intro gimmick — it is
the DNA of the whole system. Scripts (Devanagari, Telugu, Latin) recur as the
particle field, ghost watermarks, section numerals, and as a hover
micro-interaction: nav links and buttons scramble through the scripts before
settling, the intro miniaturized.

Motion is choreography, not decoration. Every animation follows the logic of
Bharatanatyam: a slow deliberate entrance (*adavu*), a held pose (*sthiti*),
a precise settle. Nothing bounces. Scroll is a performance: the Philosophy
section pins and scroll-drives a full slideshow (Active Theory style); the
Work section runs a kinetic wall of giant opposing type marquees. Kinetic
type at scale is a feature of this system — but it lives in designated zones
(telemetry strip, type wall, ghost row titles), never behind body copy.

Rule of thumb: **95% of the page is three colors** (canvas, cream, muted).
Gold is a spotlight, not a paint bucket.

## Color Palette

| Token | Hex | Role |
|----------------|--------------------------|------|
| Canvas | `#0C0906` | Page background — warm near-black, never pure `#000` |
| Surface | `#151009` | Elevated cards, panels |
| Surface-2 | `#1E1710` | Hover state of Surface, inputs |
| Hairline | `rgba(201,168,124,0.10)` | All borders and dividers |
| Cream | `#F2EDE3` | Primary text — never pure `#fff` |
| Muted | `#8F857A` | Secondary text, descriptions |
| Faint | `#57504A` | Tertiary text, metadata, labels |
| Gold | `#C9A87C` | The accent. Links, punctuation marks, key phrases |
| Gold-bright | `#E8D5B5` | Gold's hover state, gradients endpoints only |
| Ember | `#B4552D` | Rare warmth — one appearance per viewport max (e.g. status dot, signature) |

### Color rules
- Gold never fills large areas. It underlines, punctuates, borders.
- Ember is editorial only — never on buttons or interactive elements.
- Depth comes from the surface stack (Canvas → Surface → Surface-2), not shadows.
- The film grain overlay stays: `opacity 0.025`, full-viewport, above everything.

## Typography

**Monument sans — Geist Sans at weight 800–900**
- Role: the hero name and all section display titles. Heavy, tight
  (`-0.04em`), line-height 0.9. Scale + weight is the monument voice.

**Accent serif — Fraunces** (variable, optical sizing on)
- Weights: 300–600. Italic is the human voice.
- Role: one italic gold word inside each display title, pull quotes,
  asides, the personal letter, the Story section heading.
- Philosophy: the bold sans is the building; the italic serif is the
  person inside it. Never set a full heading in serif roman.

**UI sans — Geist Sans (300–500)**
- Role: body copy, project descriptions, buttons.

**Label mono — Geist Mono**
- Weight: 400. Always uppercase, `letter-spacing: 0.25em+`.
- Role: section labels, numerals, metadata, nav.
- Minimum size 0.625rem (10px). Nothing smaller, ever — the old 0.45rem labels were unreadable.

### Voice split
- *Serif italic* = the human voice (asides, the dancer, the story).
- SERIF ROMAN = the monument voice (section titles).
- `MONO UPPERCASE` = the archivist voice (labels, indices, coordinates).
- Sans = the explainer voice (what things actually are).

### Type scale
| Role | Size | Font | Weight |
|-------------|--------------------------------|----------|--------|
| Colossal | `clamp(4rem, 13vw, 15rem)` | Fraunces | 400 |
| Display | `clamp(3rem, 7.5vw, 8rem)` | Fraunces | 400 |
| Heading | `clamp(1.8rem, 3.5vw, 3rem)` | Fraunces | 450 |
| Pull quote | `clamp(1.4rem, 2.4vw, 2.1rem)` | Fraunces italic | 350 |
| Body | `clamp(1rem, 1.25vw, 1.125rem)` | Geist | 300–400 |
| Label | `0.6875rem` | Geist Mono | 400 |
| Numeral | `0.625rem` | Geist Mono | 400 |

## The Living Background (Glyph Field)

One fixed canvas behind every section (`GlyphField.jsx`). Sections are
transparent (`main section { background: transparent }`); solid surfaces exist
only on cards. Rules:
- ~130 particles max, DPR-capped at 2, single rAF loop.
- 28% of particles are script glyphs, the rest dust.
- Idle state is nearly invisible (2–12% alpha). The cursor awakens it:
  particles within 200px warm to gold, pairs within 110px link with hairlines.
- `prefers-reduced-motion`: particles freeze in place (still drawn, no drift).

## The Game (Descent)

`DescentGame.jsx` — the portfolio's game mode, triggered from a small
mono button under the Work section's project list. A procedurally
generated loss landscape (glowing gold curve, new every run); the ball
runs gradient descent on its own and the player controls only the
learning rate (↑/↓, or touch buttons). Too low: trapped in a local
minimum. Too high: the gradient explodes in ember sparks. Converge at
the global minimum in the fewest steps; best run persists in
localStorage (`bsp-descent-best`). Styled like everything else: Surface
panel, hairline borders, mono labels, gold curve, cream ball, ember for
failure. There is deliberately NO dancer figure anywhere on the site
(every figurative attempt was retired); the dance heritage lives in the
copy, the scripts, and the motion language instead. The name reveal
plays once per session (`sessionStorage: bsp-revealed`); returning
visitors land directly on the hero.

The headline game mode is CAREER.EXE (`GameMode.jsx`), launched from the
blinking green "GAME MODE" button under the nav wordmark. It is a
green-on-black pixel platformer built over her real milestones, from high
school through twelve years of Bharatanatyam, and it always ends with an
employability score of 100/100. Terminal green (`#00ff66`) exists only
inside game surfaces, never in the manuscript UI.

## The Script Motif

The eight scripts from the name reveal recur throughout:
- **Section numerals** are given twice: Latin + one other script.
  `01 — ०१` (Devanagari), `02 — ౦౨` (Telugu), `03 — ٠٣` (Arabic), `04 — ೦೪` (Kannada).
- **Ghost watermarks**: one oversized glyph per section (`भ`, `వ్య`, `ய`) at
  2–4% cream, `Fraunces` or system fallback, behind content, never overlapping body text.
- **The gold interpunct `·`** separates inline lists (never slashes or pipes).

## Spacing & Layout

- Base unit: 8px.
- Content max-width: 1200px; letter/prose max-width: 62ch.
- Section vertical padding: `clamp(6rem, 14vh, 10rem)`.
- Horizontal page gutter: `clamp(1.5rem, 6vw, 8rem)`.
- Every section header follows the same anatomy, left-aligned:
  `[hairline 50px] [MONO LABEL] ....... [numeral pair]`
  then the Display serif title below.

## Border radius vocabulary

| Element | Radius |
|-----------------|--------|
| Cards, panels | 2px |
| Buttons | 2px |
| Tags/chips | 2px |
| Images | 2px |

One radius. The manuscript is cut with a blade, not a cookie cutter. (The old
6–20px rounded look is retired.)

## Motion Language

| Token | Value | Use |
|-----------|--------------------------------------|-----|
| settle | `cubic-bezier(0.22, 1, 0.36, 1)` | Every entrance and exit |
| duration | 0.8–1.2s entrances, 0.3s hovers | |
| stagger | 0.08–0.12s between siblings | |

- Entrances: rise 30–60px + fade, once per viewport (`viewport={{ once: true }}`).
- Scroll-linked transforms (parallax, the spine cards, the shrinking wordmark) are encouraged — they are choreography.
- Hover states change color/border, never scale above 1.02.
- Short labels (nav, buttons) may scramble through the scripts on hover
  (`ScrambleText.jsx`, ~28ms/frame, settles left-to-right). Labels only —
  never body copy, never headings.
- The custom cursor (difference-blend blob) is a system component; interactive elements declare `data-hover`.
- Respect `prefers-reduced-motion`: no scroll-linked rotation, no marquee.

## Components

**Section header** — see anatomy above. The label line is the metronome of the
page; identical construction every section builds rhythm.

**Primary button** — 1px gold border, transparent fill, cream text, mono
uppercase, 2px radius. On hover: `Surface-2` fill + Gold-bright border.
*No filled gold buttons — gold is light, not paint.* One primary action per section.

**Text link** — cream, 1px gold underline offset 4px. Hover: gold text.

**Tag/chip** — mono 0.625rem, 1px Hairline border, Faint text, 2px radius,
`0.25rem 0.6rem` padding. Hover (within a hovered card): gold border, gold text.

**Info table row** — mono label (Faint) left, value (Muted) right,
Hairline bottom border, `0.75rem 0` padding.

**Ghost numeral** — oversized index numbers rendered at 3–5% cream stroke,
positioned in card corners.

## Do

- Keep the name-reveal scramble exactly as it is. It is the thesis statement.
- Use serif italic for every human aside.
- Give each section one — exactly one — atmospheric element (glow, beam, watermark).
- Left-align body copy. Center only the Letter section.
- Make every interactive element ≥ 44px tall on touch devices.

## Don't

- No pure black, no pure white.
- No pixel/novelty fonts.
- No marquees behind or beside body copy — kinetic type lives in its own bands.
- No box-shadow "pop" on buttons; depth is surface-on-surface.
- No label type below 0.625rem.
- No rounded corners above 2px.
- Never bold (700+) the serif.
