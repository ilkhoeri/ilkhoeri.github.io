"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useHotkeys } from "@/hooks/use-hotkeys";

const THEME_COOKIE_NAME = "__theme";

import {
  useTheme,
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps
} from "next-themes";

import { cnxValues } from "xuxi";

export const themeMap = [
  { name: "light", icon: null },
  { name: "system", icon: null },
  { name: "dark", icon: null }
] as const;

export type Theme = (typeof themeMap)[number]["name"];
export type ThemeKey = Theme | (string & {});
export const Theme: Theme[] = themeMap.map(theme => theme.name);
export const defaultTheme: Theme = "system";
export const theme = { themeNames: Theme } as const;

export function ThemeProvider({
  children,
  enableSystem = true,
  attribute = "class",
  defaultTheme = "system",
  disableTransitionOnChange = true,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...{
        enableSystem,
        attribute,
        defaultTheme,
        disableTransitionOnChange,
        ...props
      }}>
      {children}
      <ThemeStateHidden />
    </NextThemesProvider>
  );
}

function nextValue(current: string, themes: string[]): string {
  const currentIndex = themes.indexOf(current);
  return themes[(currentIndex + 1) % themes.length];
}

export function useNextTheme(setKey?: ThemeKey) {
  const { theme, setTheme } = useTheme();
  const parseKey = (typeof setKey !== "undefined" ? setKey : theme) as Theme;
  const [keyTheme, setKeyTheme] = React.useState<Theme>(parseKey);

  const setCookie = React.useCallback(
    (name: string, value: string, days = 30) => {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
    },
    []
  );

  const handleTheme = React.useCallback(
    (newTheme: ThemeKey, setNext: boolean = false) => {
      const updatedTheme = (
        setNext ? nextValue(newTheme, Theme as string[]) : newTheme
      ) as Theme;
      setTheme(updatedTheme);
      setKeyTheme(updatedTheme);
      setCookie(THEME_COOKIE_NAME, updatedTheme);
    },
    [setTheme]
  );

  useHotkeys([
    [
      "mod+J",
      () => {
        handleTheme(keyTheme, true);
      }
    ]
  ]);

  return { theme, keyTheme, handleTheme };
}

interface ThemeButtonsStyles<T> {
  wrapper?: T;
  buttons?: T | ((theme: Theme) => T);
}

export interface ThemeButtonsProps {
  value?: Theme | (string & {});
  classNames?: ThemeButtonsStyles<cnxValues>;
  styles?: ThemeButtonsStyles<React.CSSProperties>;
  icons?: Partial<Record<Theme, React.ReactNode>>;
}
function parseStyles<T>(theme: Theme, styles: T | ((theme: Theme) => T)): T {
  if (typeof styles !== "function") return styles;
  return (styles as (theme: Theme) => T)(theme);
}
export function ThemeButtons(props: ThemeButtonsProps) {
  const { icons, value, classNames = {}, styles = {} } = props;
  const { keyTheme, handleTheme } = useNextTheme(value);
  return (
    <section className={cn(classNames?.wrapper)} style={styles?.wrapper}>
      <code className="sr-only hidden select-none tracking-wide">⌘+J</code>
      {themeMap.map(i => (
        <button
          key={i.name}
          role="button"
          type="button"
          aria-label={i.name}
          suppressHydrationWarning
          data-state={keyTheme === i.name ? "active" : ""}
          className={cn(parseStyles(i.name, classNames?.buttons))}
          style={parseStyles(i.name, styles?.buttons)}
          onClick={() => handleTheme(i.name)}>
          {icons?.[i.name]}
          <span className="sr-only hidden">{i.name}</span>
        </button>
      ))}
    </section>
  );
}

function ThemeStateHidden() {
  useNextTheme();
  return (
    <ruby
      aria-label="THEMING_SHORTCUT (⌘/ctrl + J)"
      className="sr-only hidden"
      tabIndex={-1}
      hidden
      aria-hidden>
      <rp className="sr-only" tabIndex={-1} hidden aria-hidden>
        THEMING_SHORTCUT (⌘/ctrl + J)
      </rp>
    </ruby>
  );
}
