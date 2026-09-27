"use client";

import * as React from "react";
import {
  Sparkles,
  Layers,
  Palette,
  Terminal,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  Search,
  Settings,
  User,
  Heart,
  ShieldCheck,
  Zap,
  Database,
  Plus,
  Trash2,
  RefreshCw,
  Minus,
  RotateCcw,
  Server,
  Cpu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from "@/lib/redux/slices/counterSlice";
import {
  useGetItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
} from "@/lib/redux/services/itemsApi";

export default function Home() {
  const [copiedCmd, setCopiedCmd] = React.useState<string | null>(null);
  const [newItemName, setNewItemName] = React.useState("");
  const [newItemCategory, setNewItemCategory] = React.useState("");

  // Redux Client State
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  // RTK Query Server State
  const {
    data: items,
    isLoading: isItemsLoading,
    isFetching: isItemsFetching,
    refetch: refetchItems,
  } = useGetItemsQuery();
  const [addItem, { isLoading: isAddingItem }] = useAddItemMutation();
  const [deleteItem] = useDeleteItemMutation();

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    await addItem({
      name: newItemName.trim(),
      description: "Added dynamically via RTK Query mutation.",
      category: newItemCategory.trim() || "User Created",
      status: "active",
    });

    setNewItemName("");
    setNewItemCategory("");
  };

  const copyToClipboard = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const stackItems = [
    {
      name: "Next.js",
      version: "App Router",
      description: "React framework with Turbopack and React Server Components.",
      icon: Zap,
    },
    {
      name: "Tailwind CSS",
      version: "v4.0+",
      description: "Next-gen CSS framework with dynamic CSS variables.",
      icon: Palette,
    },
    {
      name: "shadcn/ui",
      version: "UI Components",
      description: "Composable and accessible primitives built on Base UI.",
      icon: Layers,
    },
    {
      name: "Lucide React",
      version: "Iconography",
      description: "Modern, lightweight, and tree-shakeable icons.",
      icon: Sparkles,
    },
    {
      name: "Redux Toolkit",
      version: "Client State",
      description: "Predictable state container with makeStore & typed hooks.",
      icon: Cpu,
    },
    {
      name: "RTK Query",
      version: "Server State",
      description: "Powerful data fetching, caching, and cache invalidation.",
      icon: Database,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-sm">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <span className="font-semibold tracking-tight text-base sm:text-lg">
                Next.js Template
              </span>
              <span className="ml-2 hidden rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground sm:inline-block">
                Redux + RTK Query
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://redux-toolkit.js.org/rtk-query/overview"
              target="_blank"
              rel="noreferrer"
              className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            >
              RTK Query Docs
            </a>
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            >
              shadcn/ui
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto max-w-6xl px-4 py-16 sm:py-20 sm:px-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Badge variant="secondary" className="mb-4 px-3 py-1 gap-1.5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Full-Stack State Management Ready
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground">
              Next.js + Redux +{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                RTK Query
              </span>
            </h1>

            <p className="mt-6 text-base text-muted-foreground sm:text-lg leading-relaxed max-w-2xl">
              Configured with <strong>Redux Toolkit</strong> client state, <strong>RTK Query</strong> server-side cache,{" "}
              <strong>Tailwind CSS v4</strong>, <strong>shadcn/ui</strong>, and <strong>Yarn Berry</strong>.
            </p>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Dialog>
                <DialogTrigger
                  render={
                    <Button size="lg" className="gap-2 cursor-pointer shadow-sm">
                      <Sparkles className="h-4 w-4" />
                      Try Dialog Demo
                    </Button>
                  }
                />
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      Redux & RTK Query Configured
                    </DialogTitle>
                    <DialogDescription>
                      This starter includes Next.js App Router compatible Redux store setup using{" "}
                      <code className="text-foreground bg-muted px-1.5 py-0.5 rounded text-xs">
                        makeStore()
                      </code>
                      .
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-2 text-sm text-muted-foreground space-y-2">
                    <p>Included Architecture:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Typed Hooks (useAppDispatch, useAppSelector, useAppStore)</li>
                      <li>Base RTK Query API slice with auto tag invalidation</li>
                      <li>Client-side counter slice demonstration</li>
                      <li>Next.js route handler backend integration (/api/items)</li>
                    </ul>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() =>
                        copyToClipboard("yarn dev")
                      }
                      className="gap-1.5"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copy `yarn dev`
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="outline" size="lg" className="gap-2 cursor-pointer">
                      <Settings className="h-4 w-4" />
                      Quick Commands
                    </Button>
                  }
                />
                <DropdownMenuContent align="center" className="w-56">
                  <DropdownMenuLabel>Developer Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer gap-2"
                    onClick={() => copyToClipboard("yarn dev")}
                  >
                    <Terminal className="h-4 w-4" />
                    Copy `yarn dev`
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer gap-2"
                    onClick={() => copyToClipboard("yarn build")}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Copy `yarn build`
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer gap-2"
                    onClick={() =>
                      window.open("https://redux-toolkit.js.org", "_blank")
                    }
                  >
                    <ExternalLink className="h-4 w-4" />
                    Redux Toolkit Docs
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button variant="secondary" size="lg" className="gap-2 cursor-pointer">
                      <Heart className="h-4 w-4 text-red-500 fill-red-500/20" />
                      Tooltip Demo
                    </Button>
                  }
                />
                <TooltipContent>
                  <p>Client & Server state both working in harmony!</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Tech Stack Cards */}
          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stackItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.name} className="transition-all hover:shadow-md hover:border-primary/40">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.version}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-3">{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Redux Toolkit & RTK Query Live Showcase Grid */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 1. Redux Client State: Counter Slice */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Redux Client State</CardTitle>
                      <CardDescription className="text-xs">
                        Managed with Redux Toolkit Slice
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="font-mono text-xs">
                    counterSlice.ts
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center rounded-xl bg-muted/40 p-6 border border-border/50">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Current Redux Count
                  </span>
                  <div className="text-5xl font-black tracking-tight text-primary my-3">
                    {count}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => dispatch(decrement())}
                      className="gap-1"
                    >
                      <Minus className="h-3.5 w-3.5" /> -1
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => dispatch(increment())}
                      className="gap-1"
                    >
                      <Plus className="h-3.5 w-3.5" /> +1
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => dispatch(incrementByAmount(5))}
                    >
                      +5
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dispatch(reset())}
                      className="gap-1 text-muted-foreground"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Reset
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/60 p-3 text-xs font-mono space-y-1">
                  <div className="text-muted-foreground">{"// Accessing state via typed hook:"}</div>
                  <div className="text-foreground">
                    const count = useAppSelector((state) =&gt; state.counter.value);
                  </div>
                  <div className="text-muted-foreground pt-1">{"// Dispatching actions:"}</div>
                  <div className="text-foreground">
                    dispatch(increment());
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. RTK Query Server State: Data Fetching & Mutations */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                      <Server className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">RTK Query Server State</CardTitle>
                      <CardDescription className="text-xs">
                        Cached server data via /api/items
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => refetchItems()}
                    disabled={isItemsFetching}
                    className="h-8 gap-1 text-xs"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isItemsFetching ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Add Item Form */}
                <form onSubmit={handleAddItem} className="flex gap-2">
                  <Input
                    placeholder="New item name..."
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="text-xs h-9 flex-1"
                  />
                  <Input
                    placeholder="Category (e.g. Core)"
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="text-xs h-9 w-32 hidden sm:block"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isAddingItem || !newItemName.trim()}
                    className="h-9 gap-1"
                  >
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </form>

                {/* Items List */}
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {isItemsLoading ? (
                    <div className="flex items-center justify-center py-8 text-xs text-muted-foreground gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                      Loading cached items...
                    </div>
                  ) : items && items.length > 0 ? (
                    items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 p-2.5 text-xs transition-colors hover:bg-muted/40"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">{item.name}</span>
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                              {item.category}
                            </Badge>
                          </div>
                          <p className="text-[11px] text-muted-foreground">{item.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteItem(item.id)}
                          aria-label={`Delete ${item.name}`}
                          className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-muted-foreground">
                      No items in store. Add one above!
                    </div>
                  )}
                </div>

                <div className="rounded-lg bg-muted/60 p-2.5 text-[11px] font-mono text-muted-foreground">
                  const &#123; data, isLoading, refetch &#125; = useGetItemsQuery();
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Component Playground */}
          <div className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">shadcn/ui & Lucide Playground</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Preview shadcn components with Lucide icons in both light & dark themes.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80" alt="Avatar" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-muted-foreground">Avatar Demo</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Input Demo */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Search with Lucide Icon</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search templates or components..."
                    className="pl-9"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <Badge variant="default">Primary Badge</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>

              {/* Button Variants Demo */}
              <div className="space-y-4">
                <label className="text-sm font-medium">Button Variants</label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default" size="sm">Default</Button>
                  <Button variant="secondary" size="sm">Secondary</Button>
                  <Button variant="outline" size="sm">Outline</Button>
                  <Button variant="ghost" size="sm">Ghost</Button>
                  <Button variant="destructive" size="sm">Destructive</Button>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between rounded-lg bg-muted p-3 text-xs font-mono">
                    <span className="text-muted-foreground">yarn run dev</span>
                    <button
                      onClick={() => copyToClipboard("yarn dev")}
                      className="text-foreground hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCmd === "yarn dev" ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-green-500" />
                          <span className="text-green-500">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick CLI Commands */}
          <div className="mt-16">
            <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              Helpful Yarn Commands
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { cmd: "yarn dev", desc: "Start Next.js Turbopack dev server" },
                { cmd: "yarn build", desc: "Create optimized production build" },
                { cmd: "yarn lint", desc: "Run ESLint code checks" },
                { cmd: "yarn add <pkg>", desc: "Install a new package with Yarn" },
                { cmd: "npx shadcn@latest add <component>", desc: "Add any shadcn component" },
                { cmd: "yarn start", desc: "Start production server" },
              ].map(({ cmd, desc }) => (
                <div
                  key={cmd}
                  onClick={() => copyToClipboard(cmd)}
                  className="group relative cursor-pointer rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-muted/30"
                >
                  <div className="flex items-center justify-between">
                    <code className="text-xs font-semibold font-mono text-primary">
                      {cmd}
                    </code>
                    {copiedCmd === cmd ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    )}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 bg-muted/20">
        <div className="container mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 text-xs text-muted-foreground">
          <p>
            Built with Next.js, Redux Toolkit, RTK Query, Tailwind CSS, shadcn/ui, Lucide React & Yarn.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              GitHub <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
