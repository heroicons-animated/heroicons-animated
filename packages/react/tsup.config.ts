import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsup";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const iconsDir = join(__dirname, "src/icons");
const iconNames = readdirSync(iconsDir)
  .filter((file) => file.endsWith(".tsx") && file !== "index.ts")
  .map((file) => file.replace(".tsx", ""));
const iconFiles = iconNames.map((name) => `src/icons/${name}.tsx`);

function getAllJsFiles(dir: string): string[] {
  const files: string[] = [];
  if (!existsSync(dir)) return files;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllJsFiles(fullPath));
    } else if (entry.name.endsWith(".js") || entry.name.endsWith(".mjs")) {
      files.push(fullPath);
    }
  }
  return files;
}

function addUseClientDirective() {
  const distDir = join(__dirname, "dist");
  for (const filePath of getAllJsFiles(distDir)) {
    const content = readFileSync(filePath, "utf-8");
    if (!content.startsWith('"use client"')) {
      writeFileSync(filePath, `"use client";\n${content}`);
    }
  }
}

function createIconProxies() {
  const proxyDir = __dirname;
  for (const name of iconNames) {
    // ESM proxy
    writeFileSync(
      join(proxyDir, `${name}.js`),
      `export * from "./dist/icons/${name}.js";\n`
    );
    // TypeScript declarations proxy
    writeFileSync(
      join(proxyDir, `${name}.d.ts`),
      `export * from "./dist/icons/${name}";\n`
    );
  }
}

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: true,
    splitting: true,
    treeshake: true,
    sourcemap: false,
    clean: true,
    external: ["react", "motion", "react-dom"],
    esbuildOptions(options) {
      options.alias = { "@": resolve(__dirname, "src") };
    },
    onSuccess: async () => {
      await Promise.resolve();
      addUseClientDirective();
    },
  },
  {
    entry: iconFiles,
    outDir: "dist/icons",
    format: ["esm"],
    dts: true,
    splitting: false,
    treeshake: true,
    sourcemap: false,
    external: ["react", "motion", "react-dom"],
    esbuildOptions(options) {
      options.alias = { "@": resolve(__dirname, "src") };
    },
    onSuccess: async () => {
      await Promise.resolve();
      addUseClientDirective();
      createIconProxies();
    },
  },
]);
