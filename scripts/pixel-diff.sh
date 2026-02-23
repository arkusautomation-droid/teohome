#!/usr/bin/env bash
# pixel-diff.sh — Full-page pixel comparison: Figma vs Current site
# Usage: bash scripts/pixel-diff.sh
# Requires: ImageMagick (magick)

set -e

FIGMA="figma-strona-glowna.png"
CURRENT="screenshots/current-960.png"
OUTDIR="screenshots/diff"

mkdir -p "$OUTDIR"

FIGMA_H=$(magick identify -format "%h" "$FIGMA")
CURRENT_H=$(magick identify -format "%h" "$CURRENT")
echo "Figma: 960x${FIGMA_H}, Current: 960x${CURRENT_H}"

# Pad shorter image to match taller one
MAX_H=$((FIGMA_H > CURRENT_H ? FIGMA_H : CURRENT_H))
magick "$FIGMA" -gravity North -extent "960x${MAX_H}" -background white "$OUTDIR/figma-padded.png"
magick "$CURRENT" -gravity North -extent "960x${MAX_H}" -background white "$OUTDIR/current-padded.png"

echo ""
echo "=== GENERATING DIFF ARTIFACTS ==="

# 1. Diff map — red pixels = differences
DIFF_COUNT=$(magick compare -metric AE -highlight-color red -lowlight-color "rgba(255,255,255,0.15)" \
  "$OUTDIR/figma-padded.png" "$OUTDIR/current-padded.png" "$OUTDIR/diff-full.png" 2>&1) || true
echo "  diff-full.png        — ${DIFF_COUNT} different pixels"

# 2. Side-by-side
magick "$OUTDIR/figma-padded.png" "$OUTDIR/current-padded.png" +append "$OUTDIR/side-by-side.png"
echo "  side-by-side.png     — Figma (left) | Current (right)"

# 3. 50/50 overlay blend
magick "$OUTDIR/figma-padded.png" "$OUTDIR/current-padded.png" \
  -compose blend -define compose:args=50,50 -composite "$OUTDIR/overlay-blend.png"
echo "  overlay-blend.png    — 50% blend (misalignment = blur/glow)"

# 4. Difference composite (inverted = black where identical, bright where different)
magick "$OUTDIR/figma-padded.png" "$OUTDIR/current-padded.png" \
  -compose difference -composite -auto-level "$OUTDIR/diff-heatmap.png"
echo "  diff-heatmap.png     — Brightness = magnitude of difference"

# 5. Section crops from Figma for reference
echo ""
echo "=== FIGMA SECTION REFERENCE CROPS ==="
magick "$FIGMA" -crop "960x60+0+0"    +repage "$OUTDIR/figma-01-header.png"      && echo "  01-header"
magick "$FIGMA" -crop "960x450+0+60"  +repage "$OUTDIR/figma-02-hero.png"        && echo "  02-hero"
magick "$FIGMA" -crop "960x320+0+510" +repage "$OUTDIR/figma-03-categories.png"  && echo "  03-categories"
magick "$FIGMA" -crop "960x380+0+830" +repage "$OUTDIR/figma-04-about.png"       && echo "  04-about"
magick "$FIGMA" -crop "960x450+0+1210" +repage "$OUTDIR/figma-05-designers.png"  && echo "  05-designers"
magick "$FIGMA" -crop "960x380+0+1660" +repage "$OUTDIR/figma-06-new-products.png" && echo "  06-new-products"
magick "$FIGMA" -crop "960x350+0+2040" +repage "$OUTDIR/figma-07-featured.png"   && echo "  07-featured"
magick "$FIGMA" -crop "960x480+0+2390" +repage "$OUTDIR/figma-08-blog.png"       && echo "  08-blog"
magick "$FIGMA" -crop "960x280+0+2870" +repage "$OUTDIR/figma-09-testimonials.png" && echo "  09-testimonials"
magick "$FIGMA" -crop "960x420+0+3150" +repage "$OUTDIR/figma-10-inspiration.png" && echo "  10-inspiration"
magick "$FIGMA" -crop "960x370+0+3570" +repage "$OUTDIR/figma-11-newsletter.png" && echo "  11-newsletter"
magick "$FIGMA" -crop "960x250+0+3940" +repage "$OUTDIR/figma-12-footer.png"     && echo "  12-footer"

echo ""
echo "=== DONE ==="
echo "Artifacts in: $OUTDIR/"
ls -la "$OUTDIR/" | tail -20
