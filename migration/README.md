# Migration App (React + Vite + Storybook)

This folder is the migration target for moving away from Next.js/Turborepo/Bun into a single npm-managed React app powered by Vite and Storybook.

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - typecheck + production build
- `npm run preview` - preview production build
- `npm run check-types` - run TypeScript checks
- `npm run storybook` - start Storybook
- `npm run build-storybook` - produce static Storybook build

## API Configuration

Copy `.env.example` to `.env` and set:

```bash
VITE_API_BASE_URL=https://your-api-host
```

All scene endpoints use this base URL through `src/app/api-client.ts`.

## Notes

- Route structure is handled with `react-router-dom`.
- Next-specific imports are handled in `src/next-shims` for compatibility during migration.
- Existing package code is consumed via aliases in `vite.config.ts` and `tsconfig.app.json`.
