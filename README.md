# Next.js Production Starter Template

A battle-tested, production-ready enterprise starter template built on **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **TanStack Query v5**, **Zustand v5**, **React Hook Form + Zod**, **Sonner**, **Vitest**, and **Playwright**, configured deterministically with **Yarn Berry**.

![Next.js](https://img.shields.io/badge/Next.js_16-black?logo=next.js)
![React](https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?logo=tailwind-css&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query_v5-FF4154?logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand_v5-443e38?logo=zustand&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![Yarn Berry](https://img.shields.io/badge/Yarn_Berry-2C8EBB?logo=yarn&logoColor=white)

---

## 🌟 Key Features & Capabilities

- ⚡ **Next.js 16 App Router & Turbopack**: Blazing-fast compilation, server components, streaming SSR, and optimized client bundles.
- 🎨 **Tailwind CSS v4**: Built on Tailwind's next-gen CSS-first engine with fluid CSS variables and native cascade layer control.
- 🔄 **TanStack React Query v5**: Global client provider for asynchronous server-state fetching, caching, deduplication, and automatic retries.
- 🐻 **Zustand v5 State Management**: Scalable, atomic client store (`src/stores/useUIStore.ts`) without the boilerplate or render cascade of React context.
- 📋 **React Hook Form + Zod**: Type-safe declarative form validation with high-performance uncontrolled rendering and automatic schema inference.
- 🍞 **Sonner Toasts**: Ultra-lightweight, customizable stacked toast notifications integrated with system and theme changes.
- 🌓 **Zero-Flicker Theming (`next-themes`)**: Light, dark, and system color mode support with hydration-safe providers and accessible toggles.
- 🧪 **Vitest & React Testing Library**: Instant unit and integration testing suite with jsdom, testing matchers, and path alias support.
- 🎭 **Playwright E2E Smoke Testing**: Automated browser end-to-end tests validating page rendering, routing, and critical user flows.
- 🪝 **Husky & lint-staged**: Automated Git pre-commit hooks that strictly verify TypeScript compilation (`tsc --noEmit`) and format/lint staged files.
- 💅 **Prettier & ESLint 9**: Flat ESLint configuration combined with `prettier-plugin-tailwindcss` for deterministic code styles and automatic class sorting.

---

## 📁 Repository Architecture

The project follows a clean, modular directory structure engineered for long-term scalability:

```
├── .husky/                       # Git hook scripts
│   └── pre-commit                # Pre-commit hook: typecheck & lint-staged
├── e2e/                          # Playwright end-to-end test suites
│   └── smoke.spec.ts             # Smoke tests verifying page load and layout
├── public/                       # Static public assets (SVGs, icons, images)
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── globals.css           # Global Tailwind tokens, fonts, and theme CSS
│   │   ├── layout.tsx            # Root layout with ThemeProvider, QueryProvider, Toaster
│   │   └── page.tsx              # Interactive dashboard/landing showcase page
│   ├── components/
│   │   ├── shared/               # Compound domain components
│   │   │   ├── navbar.tsx        # Responsive header with branding & state badges
│   │   │   ├── footer.tsx        # Application footer
│   │   │   └── theme-toggle.tsx  # Light/Dark/System theme switcher
│   │   ├── theme-provider.tsx    # next-themes hydration wrapper
│   │   └── ui/                   # Reusable design primitives (CVA & Tailwind)
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── separator.tsx
│   │       ├── sonner.tsx        # Theme-aware Sonner toaster
│   │       └── tooltip.tsx
│   ├── lib/
│   │   ├── query-provider.tsx    # TanStack Query client provider wrapper
│   │   └── utils.ts              # cn helper combining clsx and tailwind-merge
│   ├── stores/
│   │   └── useUIStore.ts         # Global Zustand layout & counter state
│   └── types/
│       └── index.ts              # Shared TypeScript interfaces & Zod schemas
├── tests/                        # Vitest unit & component test suites
│   ├── home.test.tsx             # Unit tests for home page, Zustand, & form
│   └── setup.ts                  # Test environment setup (DOM matchers, mocks)
├── .prettierrc                   # Prettier configuration with Tailwind plugin
├── .prettierignore               # Prettier ignore patterns
├── .yarnrc.yml                   # Yarn Berry configuration (nodeLinker: node-modules)
├── components.json               # shadcn/ui component configuration
├── eslint.config.mjs             # ESLint 9 configuration with Next.js rules
├── package.json                  # Scripts, production dependencies, and devDependencies
├── playwright.config.ts          # Playwright test runner configuration
├── tsconfig.json                 # TypeScript compiler configuration & @/* paths
└── vitest.config.ts              # Vitest test runner configuration
```

---

## 🛠️ How Each Architectural Layer Works

### 1. Unified Class Merging (`src/lib/utils.ts`)

The `cn` utility combines `clsx` (conditional CSS classes) with `tailwind-merge` (resolving conflicting Tailwind classes reliably):

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 2. Server State Management (`@tanstack/react-query`)

Configured inside `src/lib/query-provider.tsx` and mounted in `src/app/layout.tsx`. It provides an isolated, client-side `QueryClient` preventing cross-request cache pollution:

```tsx
const [queryClient] = React.useState(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: { staleTime: 60 * 1000, retry: 1, refetchOnWindowFocus: false },
      },
    })
);
```

### 3. Client State Management (`zustand`)

Lightweight atomic stores located in `src/stores/`. The sample `useUIStore.ts` manages reactive global state across multiple components without prop drilling:

```typescript
import { create } from "zustand";

export const useUIStore = create<UIState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: Math.max(0, state.count - 1) })),
  resetCount: () => set({ count: 0 }),
}));
```

### 4. Form Validation (`react-hook-form` + `zod`)

Schemas are declared in `src/types/index.ts` using Zod and linked to React Hook Form via `@hookform/resolvers/zod`:

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<ContactFormData>({
  resolver: zodResolver(contactFormSchema),
});
```

### 5. Toast Notifications (`sonner`)

Global `<Toaster />` mounted in `src/app/layout.tsx`. Triggers toasts anywhere with zero overhead:

```tsx
import { toast } from "sonner";

toast.success("Submission received!", {
  description: "Your feedback has been logged.",
});
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: `v20.x` or higher (compatible with `v18.18+`)
- **Yarn Berry**: Project uses Yarn Berry v4 configured with `nodeLinker: node-modules`.

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/davidpconqueror/nextjs_template.git
cd nextjs_template
yarn install
```

### 3. Run Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts & Commands

| Command             | Purpose                                                     |
| :------------------ | :---------------------------------------------------------- |
| `yarn dev`          | Starts the Next.js development server with Turbopack        |
| `yarn build`        | Creates an optimized production build (`next build`)        |
| `yarn start`        | Runs the built production server (`next start`)             |
| `yarn lint`         | Lints the codebase using ESLint 9                           |
| `yarn format`       | Formats all files using Prettier and sorts Tailwind classes |
| `yarn format:check` | Verifies code formatting without writing changes            |
| `yarn test`         | Runs unit and component tests once with Vitest              |
| `yarn test:watch`   | Starts Vitest in interactive watch mode                     |
| `yarn test:e2e`     | Runs Playwright end-to-end smoke tests against dev server   |
| `yarn prepare`      | Initializes Husky git hooks                                 |

---

## 🧪 Testing Guide

### Unit & Component Tests (Vitest)

Unit tests reside in the `tests/` directory and use `@testing-library/react` alongside `@testing-library/jest-dom`:

```bash
# Run all unit tests
yarn test

# Run tests in watch mode
yarn test:watch
```

### End-to-End Tests (Playwright)

E2E tests reside in `e2e/` and test real browser behavior:

```bash
# Run Playwright E2E smoke tests
yarn test:e2e
```

_Note: The configuration uses the local Google Chrome channel for native macOS/Linux compatibility and standard headless Chromium in CI._

---

## 🪝 Quality Assurance & Pre-Commit Hooks

Husky is configured with a pre-commit hook in `.husky/pre-commit`:

1. `npx tsc --noEmit` — Guarantees complete TypeScript type integrity across the project.
2. `npx lint-staged` — Automatically lints (`eslint --fix`) and formats (`prettier --write`) all staged files before committing.

To manually test the pre-commit pipeline:

```bash
npx tsc --noEmit
yarn lint
yarn format:check
```

---

## 🧩 Adding UI Primitives (shadcn/ui)

You can add any additional shadcn component using the CLI:

```bash
npx shadcn@latest add <component-name>
```

Example:

```bash
npx shadcn@latest add sheet
npx shadcn@latest add tabs
npx shadcn@latest add select
```

---

## 📄 License

This template is open-source and released under the [MIT License](LICENSE).
