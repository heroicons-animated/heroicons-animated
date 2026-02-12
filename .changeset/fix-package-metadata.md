---
"@heroicons-animated/react": patch
---

Fix package metadata and dependency classification

- Widen `motion` peer dependency range to `^11.0.0 || ^12.0.0`
- Include README and LICENSE in published package via prepack script
- Remove unused devDependencies (`vite`, `vite-plugin-dts`, `typescript`)
