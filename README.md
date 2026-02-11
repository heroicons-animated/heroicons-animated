## `heroicons-animated` is beautifully animated Heroicons for React.

![preview](./public/og.png)

**Demo** → [heroicons-animated](https://www.heroicons-animated.com)

**Sponsorship** → [heroicons-animated/sponsorship](https://github.com/sponsors/Aniket-508)

## Project Structure

```text
heroicons-animated/
├── app/                  # Next.js app router
├── components/           # Website UI components
├── public/               # Static assets + shadcn registry output
├── scripts/              # Validation + registry scripts
└── react/                # React package (@heroicons-animated/react)
```

## Installation

### Using shadcn CLI

```bash
pnpm dlx shadcn add @heroicons-animated/heart
pnpm dlx shadcn add @heroicons-animated/wifi
```

### Using npm package

```bash
pnpm add @heroicons-animated/react motion
```

```tsx
import { BeakerIcon } from "@heroicons-animated/react";
import { HeartIcon } from "@heroicons-animated/react/heart";

export default function App() {
  return (
    <>
      <BeakerIcon className="size-6" />
      <HeartIcon className="size-6" />
    </>
  );
}
```

## Development

```bash
pnpm install
pnpm run dev
```

Useful commands:

```bash
pnpm run check-imports
pnpm run check-duplicates
pnpm run type-check
pnpm run build
```

## Contributing

We welcome contributions to `heroicons-animated`. Please read the [contributing guidelines](CONTRIBUTING.md) before submitting changes.

## Credits

- Original project inspiration: [lucide-animated](https://lucide-animated.com/) by [@pqoqubbw](https://x.com/pqoqubbw)
- Heroicons: [heroicons.com](https://heroicons.com)

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
