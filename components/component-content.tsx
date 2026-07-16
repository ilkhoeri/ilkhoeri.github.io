import React from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  ExperimentIcon,
  ForkIcon,
  GithubIcon,
  ScalesLawIcon,
  SvgProps
} from "./icons";
import { cnx, cvx } from "xuxi";
import { getIconFromTags } from "@/lib/icon-map";
import { Repos } from "@/lib/filter-projects";
import { cn } from "@/lib/utils";
import { TimeInline } from "./component-client";

export interface ProjectProps extends Repos {
  icon?: (props: SvgProps) => React.JSX.Element;
}

type WithData<TD extends boolean = false> = [TD] extends [true]
  ? { data: ProjectProps[] }
  : [TD] extends [false]
    ? { data?: ProjectProps[]; children?: React.ReactNode }
    : unknown;

export type ContentPageProps<TD extends boolean = false> = {
  title?: string;
  description?: string;
  subtitle?: string;
} & WithData<TD>;

export function ContentPage(props: ContentPageProps) {
  const { title, description, subtitle, data, children } = props;
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
          {data ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {data?.map(d => {
                return <ContentCard key={d.title} {...d} />;
              })}
            </div>
          ) : (
            children
          )}
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
    name: "GitHub Repository",
    href: "https://github.com/ilkhoeri?tab=repositories"
  },
  {
    name: "NPM Packages",
    href: "https://www.npmjs.com/~khoeriilham"
  },
  {
    name: "Learning Center",
    href: "https://ilkhoeri.github.io/learn"
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
    <section className="rounded-xl border border-zinc-100 p-6 dark:border-zinc-800">
      <h2 className="mb-4 text-sm font-semibold text-black dark:text-white">
        Additional Resources
      </h2>
      <ul className="space-y-3">
        {rsc.map(r => (
          <AdditionalList key={r.name} name={r.name} href={r.href} />
        ))}
      </ul>
    </section>
  );
}

export function FooterLines() {
  return (
    <footer className="mt-16 border-t border-zinc-100 pt-8 dark:border-zinc-800">
      <FootLine type="license" />
      <FootLine type="creator" />
    </footer>
  );
}

export function FootLine({ type }: { type: "creator" | "license" }) {
  switch (type) {
    case "creator":
      return (
        <p className={classes({ s: "sm", c: "muted" })}>
          © {new Date().getFullYear()} ilkhoeri. Open source with ❤️
        </p>
      );
    case "license":
      return (
        <p className={classes({ s: "sm", c: "muted" })}>
          All projects are available under the MIT license.
        </p>
      );
  }
}

type SnapLink = {
  href: string | null | undefined;
  icon: (props: SvgProps) => React.JSX.Element;
  title: string;
  isTranslate?: boolean | undefined;
};

export function ContentCard(p: ProjectProps & { selectedTopics?: string[] }) {
  // const Icon = p.icon;
  const Icon = getIconFromTags(p.topics);
  const links: SnapLink[] = [
    {
      href: p?.href,
      icon: GithubIcon,
      title: "GitHub"
    },
    {
      href: p?.homepage,
      icon: ArrowUpRightIcon,
      title: "Homepage",
      isTranslate: true
    }
  ];
  const isExperiment = p.topics?.some(t => t === "experimental");
  return (
    <div className="group/card relative">
      <div className="group relative flex flex-col rounded-xl border border-zinc-100 p-5 transition-all hover:border-zinc-300 hover:bg-zinc-50/50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50">
        <div className="mb-4 inline-flex items-center">
          <span
            className={cnx(
              "size-10 rounded-lg",
              Icon &&
                "flex items-center justify-center bg-zinc-100 transition-colors duration-300 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-black group-hover:dark:bg-white group-hover:text-white group-hover:dark:text-black"
            )}>
            {Icon && <Icon className="size-5 transition-colors duration-300" />}
          </span>
          <Shot
            hidden={!isExperiment}
            label={"Experimental"}
            icon={ExperimentIcon}
          />
          <Shot hidden={!p.isFork} label={"Fork"} icon={ForkIcon} />
          <Shot
            hidden={!!!p.license}
            label={p.license}
            icon={ScalesLawIcon}
            displayLabel={p.license?.replace(/\s+|\blicense\b/gi, "")}
          />
        </div>

        <h3 className="inline-flex font-semibold mb-2 text-black dark:text-white">
          {p.title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {p.description}
        </p>

        {p.topics && p.topics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {p.topics?.map(topic => {
              const selected = p.selectedTopics?.includes(topic);
              return (
                <span
                  key={topic}
                  className={cnx(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    selected
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800"
                  )}>
                  {topic}
                </span>
              );
            })}
          </div>
        )}

        <TimeInline label="Created" date={p.createdAt} />
      </div>

      <div className="absolute right-5 top-5 inline-flex items-center gap-3 justify-end">
        {links.map(link => (
          <Snap key={link.title} {...link} />
        ))}
      </div>
    </div>
  );
}

function Snap({ href, icon: Icon, title, isTranslate }: SnapLink) {
  if (!href) return null;
  return (
    <Link
      href={href}
      aria-label={title}
      title={title}
      // target="_blank"
      // rel="noopener noreferrer"
      className={cnx(
        "rounded-full p-0.75 first-of-type:ml-auto cursor-pointer hover:invert bg-zinc-100 dark:bg-zinc-800",
        isTranslate &&
          "[&>svg]:group-hover/card:translate-x-0.5 [&>svg]:group-hover/card:-translate-y-0.5"
      )}>
      <Icon className="size-5 text-zinc-300 transition-all group-hover/card:text-black dark:text-zinc-600 dark:group-hover/card:text-white" />
    </Link>
  );
}

function Shot({
  label,
  displayLabel,
  hidden,
  icon: Icon
}: {
  label?: string;
  displayLabel?: string;
  hidden?: boolean;
  icon?: ((props: SvgProps) => React.JSX.Element) | undefined;
}) {
  if (hidden) return null;
  return (
    <span
      aria-label={label}
      title={label}
      className="rounded-full ml-2 inline-flex items-center gap-1">
      {Icon && <Icon className="size-3.5 text-zinc-800 dark:text-zinc-300" />}
      {displayLabel && (
        <span className="opacity-45 text-xs">{displayLabel}</span>
      )}
    </span>
  );
}

function AdditionalList({ name, href }: { name: string; href: string }) {
  return (
    <li>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between w-max text-sm text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
        <span>{name}</span>
        <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </li>
  );
}

export const classes = cvx({
  variants: {
    s: {
      sm: "text-sm",
      xs: "text-xs"
    },
    c: {
      muted: "text-zinc-400 dark:text-zinc-500"
    }
  }
});
