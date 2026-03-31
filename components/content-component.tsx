import React from "react";
import Link from "next/link";
import { ArrowLeftIcon, ArrowUpRightIcon, ForkIcon, IconProps } from "./icons";
import { getIconFromTags } from "@/lib/icon-map";
import { cnx } from "xuxi";

interface ContentData {
  title: string;
  description: string;
  href: string;
  icon?: ({ className }: IconProps) => React.JSX.Element;
  // icon?: React.ComponentType<{ className?: string }>;
  tags?: string[];
  isFork?: boolean;
}

interface ContentPageProps {
  title: string;
  description?: string;
  subtitle?: string;
  data: ContentData[];
}

export function ContentPage(props: ContentPageProps) {
  const { title, description, subtitle, data } = props;
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        {/* Back Link */}
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-black dark:hover:text-white">
          <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl">
            {title}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        </header>

        {/* Projects Grid */}
        <section className="mb-16">
          {subtitle && (
            <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {subtitle}
            </h2>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {data.map(d => {
              const Icon = getIconFromTags(d.tags);
              return (
                <a
                  key={d.title}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col rounded-lg border border-zinc-100 p-5 transition-all hover:border-zinc-300 hover:bg-zinc-50/50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50">
                  <div className="mb-4 gap-3 flex items-start justify-between">
                    <div
                      className={cnx(
                        "size-10 rounded-lg",
                        Icon &&
                          "flex items-center justify-center bg-zinc-100 transition-colors group-hover:bg-zinc-200 dark:bg-zinc-800 dark:group-hover:bg-zinc-700"
                      )}>
                      {Icon && (
                        <Icon className="size-5 text-zinc-600 dark:text-zinc-400" />
                      )}
                    </div>
                    {d.isFork && (
                      <div className="size-10 rounded-lg my-auto flex items-center justify-center bg-zinc-100 transition-colors group-hover:bg-zinc-200 dark:bg-zinc-800 dark:group-hover:bg-zinc-700">
                        <ForkIcon className="size-5 text-zinc-600 dark:text-zinc-400" />
                      </div>
                    )}
                    <ArrowUpRightIcon className="h-4 w-4 ml-auto text-zinc-300 transition-all group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-zinc-600 dark:group-hover:text-white" />
                  </div>

                  <h3 className="mb-2 inline-flex font-semibold text-black dark:text-white">
                    {d.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {d.description}
                  </p>

                  {d.tags && d.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {d.tags?.map(tag => (
                        <span
                          key={tag}
                          className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        </section>

        {/* Additional Resources */}
        <section className="rounded-lg border border-zinc-100 p-6 dark:border-zinc-800">
          <h2 className="mb-4 text-sm font-semibold text-black dark:text-white">
            Additional Resources
          </h2>
          <ul className="space-y-3">
            {resources.map(resource => (
              <AddList
                key={resource.name}
                name={resource.name}
                href={resource.href}
              />
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-zinc-100 pt-8 dark:border-zinc-800">
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            All projects are available under the MIT license.
          </p>
        </footer>
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
