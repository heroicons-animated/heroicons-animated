## `heroicons-animated` is beautifully animated heroicons.

![preview](./apps/www/public/og.png)

**Demo** → [heroicons-animated](https://www.heroicons-animated.com)

**Sponsorship** → [heroicons-animated/sponsorship](https://github.com/sponsors/Aniket-508)

## Project Structure

```
heroicons-animated/
├── apps/
│   └── www/              # Website
├── packages/
│   ├── react/            # React package (@heroicons-animated/react)
│   ├── vue/              # Vue package (@heroicons-animated/vue)
│   ├── svelte/           # Svelte package (@heroicons-animated/svelte)
│   └── shared/           # Shared utilities and types
└── tooling/
    └── typescript/       # Shared TypeScript configuration
```

## Installation

### React

```bash
npm install @heroicons-animated/react motion
# or
pnpm add @heroicons-animated/react motion
```

```tsx
import { BeakerIcon } from '@heroicons-animated/react'

export default function App() {
  return <BeakerIcon className="size-6" />
}
```

### Vue

```bash
npm install @heroicons-animated/vue @vueuse/motion
# or
pnpm add @heroicons-animated/vue @vueuse/motion
```

```vue
<script setup>
import { BeakerIcon } from '@heroicons-animated/vue'
</script>

<template>
  <BeakerIcon class="size-6" />
</template>
```

### Svelte

```bash
npm install @heroicons-animated/svelte
# or
pnpm add @heroicons-animated/svelte
```

```svelte
<script>
  import { BeakerIcon } from '@heroicons-animated/svelte'
</script>

<BeakerIcon class="size-6" />
```

## Contributing

We welcome contributions to `heroicons-animated`! Please read our [contributing guidelines](CONTRIBUTING.md) on how to submit improvements and new icons.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or just want to say hi, feel free to reach out to me on X 👉 [@alaymanguy](https://x.com/alaymanguy).
