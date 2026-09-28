"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUIStore } from "@/stores/useUIStore";

function GithubIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function Navbar() {
  const { sidebarOpen, toggleSidebar, count } = useUIStore();

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight transition hover:opacity-90"
          >
            <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-xl shadow-sm">
              <Sparkles className="size-5" />
            </div>
            <span className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-base font-bold sm:text-lg">
              Next.js Template
            </span>
          </Link>
          <Badge
            variant="outline"
            className="border-primary/20 bg-primary/5 text-primary hidden text-xs font-medium sm:inline-flex"
          >
            v0.1.0
          </Badge>
          {count > 0 && (
            <Badge variant="secondary" className="text-xs">
              State Count: {count}
            </Badge>
          )}
        </div>

        {/* Desktop Nav */}
        <nav className="text-muted-foreground hidden items-center gap-6 text-sm font-medium md:flex">
          <a href="#features" className="hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#zustand-demo" className="hover:text-foreground transition-colors">
            Zustand Store
          </a>
          <a href="#form-demo" className="hover:text-foreground transition-colors">
            Form & Toasts
          </a>
          <a href="#components-demo" className="hover:text-foreground transition-colors">
            Components
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/davidpconqueror/nextjs_template"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
          >
            <Button variant="ghost" size="icon" className="size-9">
              <GithubIcon className="size-4" />
            </Button>
          </a>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="size-9 md:hidden"
            onClick={toggleSidebar}
            aria-label="Toggle mobile menu"
          >
            {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {sidebarOpen && (
        <div className="border-border bg-background space-y-3 border-b px-4 py-4 md:hidden">
          <nav className="text-muted-foreground flex flex-col space-y-2 text-sm font-medium">
            <a
              href="#features"
              onClick={toggleSidebar}
              className="hover:text-foreground py-1.5 transition-colors"
            >
              Features
            </a>
            <a
              href="#zustand-demo"
              onClick={toggleSidebar}
              className="hover:text-foreground py-1.5 transition-colors"
            >
              Zustand Store
            </a>
            <a
              href="#form-demo"
              onClick={toggleSidebar}
              className="hover:text-foreground py-1.5 transition-colors"
            >
              Form & Toasts
            </a>
            <a
              href="#components-demo"
              onClick={toggleSidebar}
              className="hover:text-foreground py-1.5 transition-colors"
            >
              Components
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
