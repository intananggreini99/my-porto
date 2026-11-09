import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Puts the SVG icon sprite (icons + INTAN logo + rose marks) straight into
// index.html, so every <use href="#..."> works on first paint.
function inlineSprite() {
  const file = path.resolve(import.meta.dirname, "src/assets/sprite.svg");
  return {
    name: "inline-sprite",
    transformIndexHtml(html) {
      return html.replace("<!-- SPRITE -->", fs.readFileSync(file, "utf8"));
    },
  };
}

export default defineConfig({
  // Relative base: the build works from the domain root or from a sub-folder.
  base: "./",
  plugins: [react(), tailwindcss(), inlineSprite()],
  build: {
    // Bundled JS/CSS go to dist/static so they never mix with public/assets.
    assetsDir: "static",
    target: "es2020",
  },
  server: { host: true },
});
