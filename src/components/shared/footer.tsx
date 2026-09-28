import * as React from "react";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-border/60 bg-muted/20 border-t py-8 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-muted-foreground flex flex-col items-center justify-between gap-4 text-xs sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Sparkles className="size-3.5" />
            </div>
            <span className="text-foreground font-semibold">Next.js Template</span>
            <span>— Production-ready boilerplate</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Built with care and modern standards. MIT Licensed.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
