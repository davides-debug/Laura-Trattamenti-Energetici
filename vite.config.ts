import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Laura-Trattamenti-Energetici/",
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
