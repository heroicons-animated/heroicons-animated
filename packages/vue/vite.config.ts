import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const iconsDir = resolve(__dirname, "src/icons");
const iconEntries = Object.fromEntries(
  readdirSync(iconsDir)
    .filter((file) => file.endsWith(".vue"))
    .map((file) => [
      `icons/${file.replace(".vue", "")}`,
      resolve(iconsDir, file),
    ])
);

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        ...iconEntries,
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ["vue", "@vueuse/motion"],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        globals: {
          vue: "Vue",
          "@vueuse/motion": "VueUseMotion",
        },
      },
    },
  },
});
