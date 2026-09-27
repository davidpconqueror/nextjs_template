# Next.js Starter Template

A modern, production-ready template built with **Next.js**, **Redux Toolkit**, **RTK Query**, **Tailwind CSS v4**, **shadcn/ui**, and **Lucide React**, configured specifically for **Yarn**.

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white)
![RTK Query](https://img.shields.io/badge/RTK_Query-764ABC?logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-black?logo=shadcnui)
![Lucide](https://img.shields.io/badge/Lucide_React-F56565?logo=lucide)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?logo=yarn&logoColor=white)

---

## ✨ Features

- ⚡ **Next.js (App Router)** with Turbopack for ultra-fast builds and refreshes.
- 🧠 **Redux Toolkit**: Predictable client state management with App Router compatible `makeStore()` and typed hooks.
- 🔄 **RTK Query**: Automatic server-side state caching, background refetching, tag-based cache invalidation, and mutations.
- 🎨 **Tailwind CSS v4** with CSS variables and modern theming.
- 🧩 **shadcn/ui** with Base UI / Radix primitives and accessible components.
- 🌟 **Lucide React** modern icons library.
- 🌓 **Dark & Light Mode** with `next-themes` and a ready-to-use `ThemeToggle` component.
- 🧶 **Yarn Berry** setup with standard `node-modules` linker for tool compatibility.
- 🛡️ **TypeScript** & **ESLint** pre-configured.

---

## 📁 Project Structure

```
├── .yarnrc.yml                 # Yarn configuration (nodeLinker: node-modules)
├── components.json             # shadcn/ui configuration
├── package.json
├── tsconfig.json
├── src/
│   ├── app/
│   │   ├── api/items/route.ts  # Sample Next.js route handler for RTK Query
│   │   ├── globals.css         # Tailwind CSS & theme tokens
│   │   ├── layout.tsx          # Root layout with StoreProvider, ThemeProvider, & TooltipProvider
│   │   └── page.tsx            # Interactive template showcase (Redux & RTK Query live demos)
│   ├── components/
│   │   ├── theme-provider.tsx  # next-themes provider wrapper
│   │   ├── theme-toggle.tsx    # Light / Dark / System mode toggle
│   │   └── ui/                 # shadcn/ui components (Button, Card, Dialog, etc.)
│   └── lib/
│       ├── redux/
│       │   ├── store.ts        # configureStore with makeStore()
│       │   ├── hooks.ts        # Typed hooks (useAppDispatch, useAppSelector, useAppStore)
│       │   ├── StoreProvider.tsx # Client-side Redux Provider wrapper
│       │   ├── slices/
│       │   │   └── counterSlice.ts # Client state example slice
│       │   └── services/
│       │       ├── api.ts      # Base RTK Query API slice
│       │       └── itemsApi.ts # RTK Query endpoints, queries, & mutations
│       └── utils.ts            # cn helper utility
```

---

## 🧠 Using Redux State Management

### 1. Client State with Slices & Typed Hooks

Import and use `useAppSelector` and `useAppDispatch` anywhere in your client components:

```tsx
"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { increment, decrement } from "@/lib/redux/slices/counterSlice";
import { Button } from "@/components/ui/button";

export function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-3">
      <Button onClick={() => dispatch(decrement())}>-1</Button>
      <span>{count}</span>
      <Button onClick={() => dispatch(increment())}>+1</Button>
    </div>
  );
}
```

---

## 🔄 Using RTK Query for Server State

### 1. Querying Data

```tsx
"use client";

import { useGetItemsQuery } from "@/lib/redux/services/itemsApi";

export function ItemList() {
  const { data: items, isLoading, isFetching, refetch } = useGetItemsQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {items?.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### 2. Mutations with Automated Cache Invalidation

```tsx
"use client";

import { useAddItemMutation } from "@/lib/redux/services/itemsApi";
import { Button } from "@/components/ui/button";

export function CreateItem() {
  const [addItem, { isLoading }] = useAddItemMutation();

  const handleCreate = async () => {
    await addItem({
      name: "New Item",
      description: "Item description",
      category: "General",
      status: "active",
    });
  };

  return (
    <Button onClick={handleCreate} disabled={isLoading}>
      Add Item
    </Button>
  );
}
```

---

## 🚀 Getting Started

### 1. Install Dependencies

Using Yarn:

```bash
yarn install
```

### 2. Run the Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
yarn build
yarn start
```

### 4. Run Linting

```bash
yarn lint
```

---

## 🛠️ Adding More shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

For example:

```bash
npx shadcn@latest add sheet
npx shadcn@latest add tabs
npx shadcn@latest add select
```

---

## 📄 License

MIT
