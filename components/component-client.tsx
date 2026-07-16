"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { classes } from "./component-content";

export type UseMountedReturn = readonly [
  boolean,
  (mounted: React.SetStateAction<boolean>) => void
];

export function useMounted(): UseMountedReturn;
export function useMounted(defaultValue: boolean): UseMountedReturn;
export function useMounted(defaultValue: boolean = false): UseMountedReturn {
  const [mounted, setMounted] = useState<boolean>(defaultValue);
  useEffect(() => setMounted(true), []);
  return [mounted, setMounted] as const;
}

export interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ClientOnly({
  children,
  fallback = null
}: Readonly<ClientOnlyProps>) {
  const [mounted] = useMounted();
  if (!mounted) return fallback;
  return <>{children}</>;
}

export function TimeInline({
  label,
  date
}: {
  label?: string | null | undefined;
  date?: string | null | undefined;
}) {
  if (!date) return null;
  const formatDate = new Date(date).toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const [mounted] = useMounted();
  return (
    <p
      className={cn(
        classes({ s: "xs", c: "muted" }),
        "mt-4 inline-flex items-center gap-1 w-full"
      )}>
      {label && <span>{label}:</span>}
      {!mounted ? (
        <span className="h-4 rounded-sm w-[60%] bg-black/30 dark:bg-white/30 animate-pulse" />
      ) : (
        <time dateTime={String(date)}>{formatDate}</time>
      )}
    </p>
  );
}
