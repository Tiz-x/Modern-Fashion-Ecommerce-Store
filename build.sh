#!/usr/bin/env bash
set -e
npm install
npx vite build
echo "Build complete!"
