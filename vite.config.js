import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  // Change this to "/your-repository-name/" for a GitHub Pages project site.
  // Keep "/" for Vercel or a custom domain.
  base: "/",
  resolve: { preserveSymlinks: true },
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectRoot, "index.html"),
        gallery: resolve(projectRoot, "gallery.html"),
      },
    },
  },
});
