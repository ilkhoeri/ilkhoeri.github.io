import React from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  ForkIcon,
  GithubIcon,
  IconProps,
  ScalesLawIcon
} from "./icons";
import { cnx } from "xuxi";
import { getIconFromTags } from "@/lib/icon-map";

export interface ProjectProps {
  title: string;
  description: string;
  homepage: string;
  href: string;
  icon?: ({ className }: IconProps) => React.JSX.Element;
  // icon?: React.ComponentType<{ className?: string }>;
  tags?: string[];
  isFork?: boolean;
  license?: string;
  language?: string;
  languageColor?: string;
}

export interface ContentPageProps {
  title?: string;
  description?: string;
  subtitle?: string;
  data: ProjectProps[];
}

export function ContentPage(props: ContentPageProps) {
  const { title, description, subtitle, data } = props;
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        {/* Back Link */}
        {title || description ? (
          <Link
            href="/"
            className="group mb-12 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-black dark:hover:text-white">
            <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        ) : (
          <hr className="mb-8 border-t-zinc-800" />
        )}

        {/* Header */}
        {(title || description) && (
          <header className="mb-12">
            {title && (
              <h1 className="mb-4 text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                {description}
              </p>
            )}
          </header>
        )}

        {/* Projects Grid */}
        <section className="mb-16">
          {subtitle && (
            <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {subtitle}
            </h2>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {data?.map(d => {
              return <ContentCard key={d.title} {...d} />;
            })}
          </div>
        </section>

        {/* Additional Resources */}
        <AdditionalResources />
        {/* Footer */}
        <FooterLines />
      </main>
    </div>
  );
}

const resources = [
  {
    name: "Repository GitHub",
    href: "https://github.com/ilkhoeri?tab=repositories"
  },
  {
    name: "NPM Packages",
    href: "https://www.npmjs.com/~khoeriilham"
  },
  {
    name: "Learning Center",
    href: "https://oerilabs.vercel.app/learn"
  }
];

export function AdditionalResources({
  data: rsc = resources
}: {
  data?: {
    name: string;
    href: string;
  }[];
}) {
  return (
    <section className="rounded-lg border border-zinc-100 p-6 dark:border-zinc-800">
      <h2 className="mb-4 text-sm font-semibold text-black dark:text-white">
        Additional Resources
      </h2>
      <ul className="space-y-3">
        {rsc.map(r => (
          <AddList key={r.name} name={r.name} href={r.href} />
        ))}
      </ul>
    </section>
  );
}

export function FooterLines() {
  return (
    <footer className="mt-16 border-t border-zinc-100 pt-8 dark:border-zinc-800">
      <p className="text-sm text-zinc-400 dark:text-zinc-500">
        All projects are available under the MIT license.
      </p>
    </footer>
  );
}

export function ContentCard(p: ProjectProps & { selectedTags?: string[] }) {
  // const Icon = p.icon;
  const Icon = getIconFromTags(p.tags);
  const links = [
    {
      href: p.href,
      icon: GithubIcon,
      title: "GitHub"
    },
    {
      href: p.homepage,
      icon: ArrowUpRightIcon,
      title: "Homepage",
      isTranslate: true
    }
  ];
  return (
    <div className="group relative flex flex-col rounded-lg border border-zinc-100 p-5 transition-all hover:border-zinc-300 hover:bg-zinc-50/50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50">
      <div className="mb-4 gap-3 flex items-start justify-between">
        <div
          className={cnx(
            "size-10 rounded-lg",
            Icon &&
              "flex items-center justify-center bg-zinc-100 transition-colors group-hover:bg-zinc-200 dark:bg-zinc-800 dark:group-hover:bg-zinc-700"
          )}>
          {Icon && <Icon className="size-5 text-zinc-600 dark:text-zinc-400" />}
        </div>
        {links.map(link => {
          if (!p.href) return null;
          return <Snap key={link.title} {...link} />;
        })}
      </div>

      <div className="mb-2 inline-flex items-center">
        <h3 className="inline-flex font-semibold text-black dark:text-white">
          {p.title}
        </h3>
        {p.isFork && (
          <span aria-label="Fork" title="Fork" className="rounded-full ml-2">
            <ForkIcon className="size-3.5 text-zinc-800 dark:text-zinc-300" />
          </span>
        )}
        {p.license && (
          <span
            aria-label={p.license}
            title={p.license}
            className="rounded-full ml-2">
            <ScalesLawIcon className="size-3.5 text-zinc-800 dark:text-zinc-300" />
          </span>
        )}
      </div>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        {p.description}
      </p>

      {p.tags && p.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {p.tags?.map(tag => {
            const selected = p.selectedTags?.includes(tag);
            return (
              <span
                key={tag}
                className={cnx(
                  "rounded-full px-2.5 py-0.5 text-xs font-medium",
                  selected
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800"
                )}>
                {tag}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Snap({
  href,
  icon: Icon,
  title,
  isTranslate
}: {
  href?: string;
  icon: any;
  title: string;
  isTranslate?: boolean;
}) {
  if (!href) return null;
  return (
    <Link
      href={href}
      aria-label={title}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      className={cnx(
        "rounded-full p-0.75 first-of-type:ml-auto cursor-pointer hover:invert bg-zinc-100 dark:bg-zinc-800",
        isTranslate &&
          "[&>svg]:group-hover:translate-x-0.5 [&>svg]:group-hover:-translate-y-0.5"
      )}>
      <Icon className="size-5 text-zinc-300 transition-all group-hover:text-black dark:text-zinc-600 dark:group-hover:text-white" />
    </Link>
  );
}

function AddList({ name, href }: { name: string; href: string }) {
  return (
    <li>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between text-sm text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
        <span>{name}</span>
        <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </li>
  );
}
