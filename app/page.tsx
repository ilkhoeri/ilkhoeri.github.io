import fs from "fs";
import path from "path";
import { cnx, cvx } from "xuxi";
import Link from "next/link";
import { allTopics, GENERATED_EXPORT_PATH } from "@/routes";
import {
  ArrowUpRightIcon,
  BlueprintHelmetIcon,
  BookMarkIcon,
  CircleDotIcon,
  Code2Icon,
  ForkIcon,
  GithubIcon,
  HeartOutlineToneIcon,
  InfoCircleIcon,
  SvgProps
} from "@/components/icons";
import { FootLine } from "@/components/component-content";

export default async function HomeCompt() {
  const filePath = path.join(
    process.cwd(),
    GENERATED_EXPORT_PATH,
    "pinned.json"
  );
  const repos = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
    : null;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Link
              href={"/me"}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black dark:bg-white focus-visible:[outline:none] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black focus-visible:ring-purple-800/80">
              <Code2Icon className="h-5 w-5 text-white dark:text-black" />
            </Link>
            <span className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
              ilkhoeri
            </span>
          </div>

          <h1 className="text-4xl font-extralight font-google-sans-flex tracking-tight text-black dark:text-white sm:text-5xl">
            Hello,{" "}
            <span className="font-medium">
              <strong>World!</strong>
            </span>
          </h1>
        </header>

        {/* Introduction */}
        <section className="mb-16">
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Welcome to my documentation and collection of open-source projects.
            Here you'll find a variety of modules, templates, and guides to help
            you build modern web applications.
          </p>
        </section>

        {/* Quick Links */}
        <section className="mb-16">
          <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Start from here
          </h2>
          <div className="space-y-4">
            {linklist.map(link => (
              <LinkList key={link.href} {...link} />
            ))}
          </div>
        </section>

        {/* CTA Buttons */}
        <section className="flex flex-col gap-3 sm:flex-row">
          {actionsList.map(act => (
            <Link
              key={act.label}
              href={act.href}
              target={act.target}
              rel="noopener noreferrer nofollow"
              className={classes({ s: "button-icon-left", color: act.color })}>
              {act.icon}
              <span className="font-mono text-sm font-medium">{act.label}</span>
            </Link>
          ))}
        </section>

        {/* Pinned */}

        {fs.existsSync(filePath) && (
          <>
            <hr className="border-t-transparent mt-12" />
            <div className="mx-auto max-w-5xl px-6 pt-12">
              <h2 className="mb-4 text-sm font-medium tracking-normal text-zinc-400 dark:text-zinc-500">
                Pinned
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {repos.map((repo: any) => {
                  const foot = [
                    {
                      key: "language",
                      text: repo?.primaryLanguage?.name,
                      icon: (
                        <CircleDotIcon
                          className="size-3.5 mr-1"
                          style={
                            repo?.primaryLanguage?.color && {
                              color: repo?.primaryLanguage?.color
                            }
                          }
                        />
                      )
                    },
                    {
                      key: "starts",
                      text: repo?.stargazerCount,
                      icon: "⭐"
                    },
                    {
                      key: "fork",
                      text: repo?.forkCount,
                      icon: <ForkIcon className="size-4 mr-1" />
                    }
                  ];
                  return (
                    <li
                      key={repo.name}
                      className="group relative flex flex-col rounded-lg border border-zinc-100 p-5 transition-all hover:border-zinc-300 hover:bg-zinc-50/50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50">
                      <h3 className="mb-2 inline-flex flex-row items-center text-black dark:text-white">
                        <BookMarkIcon className="mr-2 size-4 text-zinc-500 dark:text-zinc-400" />
                        <Link
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-sm text-sky-700 dark:text-sky-500">
                          {repo.name}
                        </Link>
                      </h3>
                      <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {repo.description}
                      </p>

                      <p
                        className={cnx(
                          foot &&
                            foot.length > 0 &&
                            "flex flex-row items-center text-sm leading-relaxed text-zinc-500 dark:text-zinc-400"
                        )}>
                        {foot &&
                          foot.length > 0 &&
                          foot
                            .filter(item => item?.text && item?.text !== "0")
                            .map((item, idx) => {
                              if (!item?.text) return null;
                              if (!isNaN(Number(item?.text))) {
                                if (Number(item?.text) === 0) return null;
                              }
                              return (
                                <span
                                  key={item.key}
                                  className={cnx(
                                    "flex flex-row items-center",
                                    idx !== 0 &&
                                      "relative ml-4 before:absolute before:-left-2 before:top-1/2 before:-translate-y-1/2 before:content-['•']"
                                  )}>
                                  {item?.icon} {item?.text}
                                </span>
                              );
                            })}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}

        {/* Footer */}
        <footer className="mt-24 border-t border-zinc-100 pt-8 dark:border-zinc-800">
          <FootLine type="creator" />
        </footer>
      </main>
    </div>
  );
}

const actionsList = [
  {
    href: "/me",
    label: "About Me",
    icon: <InfoCircleIcon className="size-6" />,
    target: "_self" as const,
    color: "theme" as const
  },
  {
    href: "https://github.com/sponsors/ilkhoeri?o=esb",
    label: "Sponsor",
    icon: <HeartOutlineToneIcon className="text-[#db61a2] size-6" />,
    target: "_blank" as const,
    color: "slate" as const
  },
  {
    href: "https://github.com/ilkhoeri",
    label: "GitHub",
    icon: <GithubIcon className="size-6" />,
    target: "_self" as const,
    color: "contrast" as const
  }
];

const linklist = [
  {
    href: "/projects/",
    title: "All Projects",
    desc: "Explore my projects and experiments",
    icon: BlueprintHelmetIcon
  },
  ...allTopics.map(t => ({
    href: t.url,
    title: t.title,
    desc: t.shortDesc,
    icon: t.icon
  }))
];

interface CompProps {
  href: string;
  title: string;
  desc: string;
  icon: (props: SvgProps) => React.JSX.Element;
}
export function LinkList(props: CompProps) {
  const { href, title, desc, icon: Icon } = props;
  return (
    <Link
      href={href}
      className="group flex items-center justify-between border-b border-zinc-100 pb-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-600">
      <div className="flex items-center gap-4">
        <span className="[&>svg]:size-5 text-zinc-400 transition-colors group-hover:text-black dark:group-hover:text-white">
          {Icon && <Icon />}
        </span>
        <div className="grid">
          <span className="font-medium text-black dark:text-white">
            {title}
          </span>
          <span className="text-sm text-zinc-500">{desc}</span>
        </div>
      </div>
      <ArrowUpRightIcon className="h-4 w-4 text-zinc-300 transition-all group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-zinc-600 dark:group-hover:text-white" />
    </Link>
  );
}

const classes = cvx({
  variants: {
    s: {
      "button-icon-left":
        "relative inline-flex items-center justify-center gap-2 h-11 py-0 pl-3 pr-4 rounded-full cursor-pointer select-none border w-full sm:w-max"
    },
    color: {
      contrast:
        "bg-black text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200",
      theme:
        "border-zinc-200 text-black transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900",
      slate:
        "text-[#f0f6fc] bg-[#4d5864] border-[#2d3137] dark:fill-[#9198a1] dark:bg-[#212830] dark:border-[#3d444d]"
    }
  }
});
