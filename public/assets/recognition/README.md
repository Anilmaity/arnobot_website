# Recognition badges

Artwork for the home page "Rewards and Recognition" strip
(`src/components/sections/home/RecognitionSection.tsx`). Each file is the mark
of the body that gave the award, or of the outlet that ran the coverage.

Add a file here, then set `image: '/assets/recognition/<file>'` on the matching
entry in `src/data/recognition.ts`. An entry with no `image` falls back to a
monogram seal, so a distinction can go up before its artwork does.

The tile is 250x150 and fits artwork with `object-fit: contain`, so any aspect
ratio is safe — nothing is cropped. Transparent PNG/WebP sits cleanly on the
white tile.

## Source

The five awards come from ARNOBOT's own award register, `APL/AWARD/2526/01`
("List Of Award & Recognisation", 2025-26). Logos were taken from each body's
official site; the Divya Bhaskar wordmark is the public-domain file on
Wikimedia Commons.

Two were cropped to read at tile size: Karnavati University's site logo bundles
a NAAC accreditation badge, and KPGU's carries a long text block that would be
illegible at 150px tall. Both were trimmed to the mark itself.

## trophies/

The trophy photographs from the same register, one per award. They are not
wired into the page — the strip shows who gave the award rather than the
trophy — but they are kept here in case that changes. They are low resolution
(around 200x270), straight out of the PDF; better originals would be needed
before putting them on the page.
