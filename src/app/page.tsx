"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Sparkles,
  Palette,
  Terminal,
  Zap,
  Copy,
  Check,
  Send,
  Plus,
  Minus,
  RotateCcw,
  Sliders,
  Database,
  ShieldCheck,
  FileCheck2,
  Activity,
  Code2,
  ExternalLink,
} from "lucide-react";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUIStore } from "@/stores/useUIStore";
import { contactFormSchema, type ContactFormData } from "@/types";

export default function Home() {
  const [copiedCmd, setCopiedCmd] = React.useState<string | null>(null);

  // Zustand state
  const { count, increment, decrement, resetCount, bannerDismissed, dismissBanner } =
    useUIStore();

  // React Hook Form + Zod
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      category: "feedback",
      message: "",
    },
  });

  const onFormSubmit = async (data: ContactFormData) => {
    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 600));

    toast.success("Form submitted successfully!", {
      description: `Thank you, ${data.name}. We received your ${data.category} submission.`,
    });

    resetForm();
  };

  const copyToClipboard = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    toast.info("Command copied to clipboard", { description: cmd });
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const stackItems = [
    {
      name: "Next.js 16 (App Router)",
      version: "React 19 & Turbopack",
      description: "Blazing fast server components and optimized streaming.",
      icon: Zap,
    },
    {
      name: "Tailwind CSS v4",
      version: "Native CSS Engine",
      description: "Streamlined utility engine with modern CSS variable theming.",
      icon: Palette,
    },
    {
      name: "TanStack React Query v5",
      version: "Server State Manager",
      description: "Powerful asynchronous state caching, refetching, and deduping.",
      icon: Database,
    },
    {
      name: "Zustand v5",
      version: "Client State Store",
      description: "Zero-boilerplate, lightweight state management with hooks.",
      icon: Sliders,
    },
    {
      name: "React Hook Form + Zod",
      version: "Type-Safe Forms",
      description: "High-performance un-rendered form validation with schema typing.",
      icon: FileCheck2,
    },
    {
      name: "Sonner Toasts",
      version: "Notification System",
      description: "Accessible, stacked toast notifications with theme awareness.",
      icon: Sparkles,
    },
    {
      name: "Vitest & Playwright",
      version: "Comprehensive Testing",
      description: "Fast unit testing with Vitest/RTL and browser E2E smoke tests.",
      icon: ShieldCheck,
    },
    {
      name: "Husky & lint-staged",
      version: "Git Hooks Automation",
      description: "Enforces strict type checks, formatting, and linting on commit.",
      icon: Activity,
    },
  ];

  return (
    <div className="bg-background text-foreground selection:bg-primary/20 selection:text-primary flex min-h-screen flex-col antialiased">
      <Navbar />

      {/* Dismissible Top Notification Banner */}
      {!bannerDismissed && (
        <aside
          aria-label="Template announcement"
          className="border-primary/20 bg-primary/10 text-primary flex items-center justify-center gap-2 border-b px-4 py-2 text-center text-xs font-medium sm:text-sm"
        >
          <span>
            ✨ Production-ready template with React 19, Zustand, Query v5, and Playwright.
          </span>
          <button
            onClick={dismissBanner}
            className="ml-2 cursor-pointer text-xs underline transition hover:opacity-80"
            aria-label="Dismiss banner"
          >
            Dismiss
          </button>
        </aside>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-border/50 relative overflow-hidden border-b py-16 sm:py-24">
          <div className="mx-auto max-w-7xl space-y-6 px-4 text-center sm:px-6 lg:px-8">
            <div className="border-border bg-muted/60 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold shadow-sm">
              <Sparkles className="text-primary size-3.5 animate-pulse" />
              <span>Universal Enterprise Template</span>
            </div>

            <h1 className="mx-auto max-w-3xl text-4xl leading-tight font-extrabold tracking-tight sm:text-6xl">
              Build Faster with a{" "}
              <span className="from-primary via-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                Production-Ready
              </span>{" "}
              Next.js Architecture
            </h1>

            <p className="text-muted-foreground mx-auto max-w-2xl text-base leading-relaxed sm:text-lg">
              Equipped with App Router, Tailwind CSS v4, Zustand, TanStack Query v5, React
              Hook Form with Zod, Sonner toasts, Vitest, Playwright, and Husky pre-commit
              hooks.
            </p>

            {/* Quick Install Command Box */}
            <div className="flex justify-center pt-2">
              <div className="border-border bg-card/80 inline-flex items-center gap-3 rounded-xl border p-2 pl-4 shadow-sm backdrop-blur-sm">
                <Terminal className="text-muted-foreground size-4" />
                <code className="text-foreground font-mono text-xs font-semibold sm:text-sm">
                  git clone https://github.com/davidpconqueror/nextjs_template.git
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    copyToClipboard(
                      "git clone https://github.com/davidpconqueror/nextjs_template.git"
                    )
                  }
                  className="size-8 p-0"
                  aria-label="Copy clone command"
                >
                  {copiedCmd ? (
                    <Check className="size-4 text-green-500" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <a href="#zustand-demo">
                <Button size="lg" className="shadow-md">
                  Explore Interactive Demos
                </Button>
              </a>
              <a
                href="https://github.com/davidpconqueror/nextjs_template"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="gap-2">
                  <Code2 className="size-4" />
                  GitHub Repository
                  <ExternalLink className="size-3.5 opacity-70" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Features / Tech Stack Grid */}
        <section
          id="features"
          className="border-border/50 bg-muted/20 border-b py-16 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Curated Modern Tech Stack
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Every component and dependency is configured with best practices, strict
                typing, and high performance.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {stackItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.name}
                    className="border-border/80 bg-card relative overflow-hidden transition-all hover:shadow-md"
                  >
                    <CardHeader className="space-y-3">
                      <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <CardTitle className="text-base font-semibold">
                            {item.name}
                          </CardTitle>
                        </div>
                        <span className="text-primary mt-0.5 block text-xs font-medium">
                          {item.version}
                        </span>
                      </div>
                      <CardDescription className="text-muted-foreground text-xs leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Interactive Zustand State Demo */}
        <section id="zustand-demo" className="border-border/50 border-b py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="space-y-2 text-center">
                <Badge
                  variant="outline"
                  className="border-primary/30 text-primary text-xs"
                >
                  Client State Management
                </Badge>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Zustand Global State in Action
                </h2>
                <p className="text-muted-foreground text-sm">
                  The counter below is managed via a centralized Zustand store
                  (`src/stores/useUIStore.ts`), immediately reflected across the navbar
                  badge and page.
                </p>
              </div>

              <Card className="border-border/80 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Interactive Counter Store</CardTitle>
                  <CardDescription>
                    Increment or decrement to verify reactivity without prop drilling.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-between gap-6 py-4 sm:flex-row">
                  <div className="flex items-baseline gap-3">
                    <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                      Current State:
                    </span>
                    <span
                      data-testid="zustand-counter-value"
                      className="text-primary font-mono text-4xl font-extrabold"
                    >
                      {count}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={decrement}
                      aria-label="Decrement counter"
                      className="gap-1.5"
                    >
                      <Minus className="size-4" />
                      <span>Decrement</span>
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={increment}
                      aria-label="Increment counter"
                      className="gap-1.5"
                    >
                      <Plus className="size-4" />
                      <span>Increment</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetCount}
                      aria-label="Reset counter"
                      className="gap-1.5"
                    >
                      <RotateCcw className="size-4" />
                      <span>Reset</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Validated Form with React Hook Form + Zod + Sonner */}
        <section
          id="form-demo"
          className="border-border/50 bg-muted/20 border-b py-16 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl space-y-6">
              <div className="space-y-2 text-center">
                <Badge
                  variant="outline"
                  className="border-primary/30 text-primary text-xs"
                >
                  Form Validation & Feedback
                </Badge>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  React Hook Form + Zod + Sonner
                </h2>
                <p className="text-muted-foreground text-sm">
                  Validates inputs with a strict Zod schema on client-side and triggers a
                  Sonner toast upon successful resolution.
                </p>
              </div>

              <Card className="border-border/80 bg-card shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Template Feedback Form</CardTitle>
                  <CardDescription>
                    Test client-side validation errors by submitting empty or invalid
                    data.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name-input"
                        className="text-foreground text-xs font-semibold"
                      >
                        Your Name
                      </label>
                      <Input
                        id="name-input"
                        placeholder="John Doe"
                        {...register("name")}
                        className={
                          errors.name
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }
                      />
                      {errors.name && (
                        <p className="text-destructive text-xs font-medium">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email-input"
                        className="text-foreground text-xs font-semibold"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email-input"
                        type="email"
                        placeholder="john@example.com"
                        {...register("email")}
                        className={
                          errors.email
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }
                      />
                      {errors.email && (
                        <p className="text-destructive text-xs font-medium">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="category-select"
                        className="text-foreground text-xs font-semibold"
                      >
                        Category
                      </label>
                      <select
                        id="category-select"
                        {...register("category")}
                        className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:ring-3"
                      >
                        <option value="feedback">General Feedback</option>
                        <option value="feature">Feature Request</option>
                        <option value="bug">Bug Report</option>
                        <option value="general">Question</option>
                      </select>
                      {errors.category && (
                        <p className="text-destructive text-xs font-medium">
                          {errors.category.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="message-input"
                        className="text-foreground text-xs font-semibold"
                      >
                        Message
                      </label>
                      <textarea
                        id="message-input"
                        rows={3}
                        placeholder="Share your thoughts or questions about this Next.js template..."
                        {...register("message")}
                        className={`focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-colors outline-none focus-visible:ring-3 ${
                          errors.message ? "border-destructive" : "border-input"
                        }`}
                      />
                      {errors.message && (
                        <p className="text-destructive text-xs font-medium">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full gap-2"
                    >
                      <Send className="size-4" />
                      <span>
                        {isSubmitting ? "Submitting..." : "Submit Form & Trigger Toast"}
                      </span>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Design System Primitives Showcase */}
        <section id="components-demo" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
              <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                Design System Primitives
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Composable UI Components
              </h2>
              <p className="text-muted-foreground text-sm">
                All primitives reside in `src/components/ui/` built with Tailwind CSS and
                accessible patterns.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Button Variants Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Button Variants</CardTitle>
                  <CardDescription className="text-xs">
                    Primary, Secondary, Outline, Ghost, and Destructive.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Button variant="default" size="sm">
                    Default
                  </Button>
                  <Button variant="secondary" size="sm">
                    Secondary
                  </Button>
                  <Button variant="outline" size="sm">
                    Outline
                  </Button>
                  <Button variant="ghost" size="sm">
                    Ghost
                  </Button>
                  <Button variant="destructive" size="sm">
                    Destructive
                  </Button>
                </CardContent>
              </Card>

              {/* Badges & Avatars */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Badges & Avatars</CardTitle>
                  <CardDescription className="text-xs">
                    Status indicators, tags, and user representations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar size="default">
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces"
                        alt="Avatar"
                      />
                      <AvatarFallback>NT</AvatarFallback>
                    </Avatar>
                    <div className="text-xs">
                      <p className="text-foreground font-semibold">John Doe</p>
                      <p className="text-muted-foreground">Lead Engineer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dialogs & Menus */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Modals & Popovers</CardTitle>
                  <CardDescription className="text-xs">
                    Accessible Dialog modals and Dropdown menus.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <Dialog>
                    <DialogTrigger
                      render={
                        <Button variant="outline" size="sm">
                          Open Dialog
                        </Button>
                      }
                    />
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Example Dialog Modal</DialogTitle>
                        <DialogDescription>
                          This modal demonstrates accessible overlay behavior configured
                          out of the box.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="text-muted-foreground py-2 text-sm">
                        Everything is styled using Tailwind CSS v4 variables with seamless
                        dark mode support.
                      </div>
                      <DialogFooter>
                        <Button size="sm">Got it</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="secondary" size="sm">
                          Actions Menu
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Project Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => toast.info("Cloned repo selected")}
                      >
                        Clone Repo
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.info("View docs selected")}>
                        View Docs
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button variant="ghost" size="sm">
                          Hover Me
                        </Button>
                      }
                    />
                    <TooltipContent>Accessible Tooltip content</TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
