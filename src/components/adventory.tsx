"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export interface AdventoryProps {
  className?: string;
}

export const Adventory = ({ className }: AdventoryProps) => {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://adventory.to/ad.card.js";
    script.async = true;
    script.dataset.placement = "82615054-d74e-4302-8ceb-935792ee5d33";

    if (resolvedTheme === "dark") {
      script.dataset.theme = "dark";
    }

    container.append(script);

    return () => {
      container.innerHTML = "";
    };
  }, [resolvedTheme]);

  return <div className={cn("h-full w-full", className)} ref={containerRef} />;
};
