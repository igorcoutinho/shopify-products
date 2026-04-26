# shopify-products

Product card (Domaine take-home): Vite, React, TypeScript, Tailwind v4, TanStack Query, mock `fetch` in `infrastructure`. Folders: `domain` / `application` / `infrastructure` / `presentation`.

## Commands

| Command | Description |
|--------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server (port 5173) |
| `npm run build` | Typecheck + `vite build` |
| `npm test` | Vitest, single run |
| `npm run test:watch` | Vitest, watch |
| `npm run lint` | ESLint |
| `npm run preview` | Serve `dist` |

`?simulateError=1` or the **Mock** control at the bottom forces the mock to error.

Product PNGs: `public/products/`, see `src/infrastructure/config/productFixtures.ts`.
