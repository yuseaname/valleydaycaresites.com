#!/bin/bash
# Build all demo sites as static exports and copy to public/demos/
# Usage: bash .zscripts/build-demos.sh

set -e

DEMO_SITES_DIR="../demo sites/extracted"
PUBLIC_DEMOS_DIR="../valleydaycaresites.com/public/demos"
# When run from valleydaycaresites.com/ dir, adjust:
PUBLIC_DEMOS_DIR="./public/demos"
DEMO_SITES_DIR="../demo sites/extracted"

DEMOS=(
  "bright-start-academy"
  "little-hearts-daycare"
  "sunshine-learning-center"
  "growing-minds-academy"
  "happy-kids-childcare"
  "tiny-steps-learning"
)

# Create output directory
mkdir -p "$PUBLIC_DEMOS_DIR"

for demo in "${DEMOS[@]}"; do
  echo ""
  echo "============================================"
  echo "Building: $demo"
  echo "============================================"

  DEMO_DIR="$DEMO_SITES_DIR/$demo"

  if [ ! -d "$DEMO_DIR" ]; then
    echo "ERROR: Directory not found: $DEMO_DIR"
    continue
  fi

  cd "$DEMO_DIR"

  # Install dependencies if needed
  if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    bun install
  fi

  # Generate Prisma client if needed
  if [ -f "prisma/schema.prisma" ]; then
    echo "Generating Prisma client..."
    bun run db:generate 2>/dev/null || true
  fi

  # Temporarily switch to static export for building
  echo "Configuring static export..."
  if grep -q 'output: "standalone"' next.config.ts; then
    sed -i 's/output: "standalone"/output: "export"/g' next.config.ts
  fi

  # Build
  echo "Building..."
  bun run build 2>&1 || {
    echo "Build failed for $demo, restoring config..."
    if grep -q 'output: "export"' next.config.ts; then
      sed -i 's/output: "export"/output: "standalone"/g' next.config.ts
    fi
    cd - > /dev/null
    continue
  }

  # Restore original config
  if grep -q 'output: "export"' next.config.ts; then
    sed -i 's/output: "export"/output: "standalone"/g' next.config.ts
  fi

  # Copy static output to public/demos/
  echo "Copying to public/demos/$demo..."
  rm -rf "$PUBLIC_DEMOS_DIR/$demo"

  # For static export, output goes to 'out/' directory
  if [ -d "out" ]; then
    cp -r out "$PUBLIC_DEMOS_DIR/$demo"
  else
    echo "WARNING: No 'out' directory found for $demo"
  fi

  cd - > /dev/null
  echo "Done: $demo"
done

echo ""
echo "============================================"
echo "All demos built!"
echo "============================================"
ls -la "$PUBLIC_DEMOS_DIR/"
