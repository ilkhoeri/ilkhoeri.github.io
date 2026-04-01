import {
  ArrowUpRightIcon,
  BlueprintHelmetIcon,
  BookMarkIcon,
  BookOpenIcon,
  CircleDotIcon,
  Code2Icon,
  ForkIcon
} from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { cnx } from "xuxi";
import fs from "fs";
import path from "path";

export default async function HomeCompt() {
  const filePath = path.join(process.cwd(), "public", "pinned.json");
  const repos = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black dark:bg-white">
              <Code2Icon className="h-5 w-5 text-white dark:text-black" />
            </div>
            <span className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
              ilkhoeri
            </span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-white sm:text-5xl">
            Hello, World.
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
          <Link
            href="https://github.com/ilkhoeri"
            target="_self"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
            <Image
              className="dark:invert"
              src="/github.svg"
              alt="GitHub-wine logomark"
              width={24}
              height={24}
            />
            GitHub
          </Link>
          {/* <Link
            href="https://ilkhoeri.github.io/me"
            target="_self"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-6 text-sm font-medium text-black transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900">
            About Me
          </Link> */}
        </section>

        {/* Pinned */}
        <hr className="border-t-transparent mt-12" />
        <div className="mx-auto max-w-5xl px-6 pt-12">
          <h2 className="mb-4 text-xs font-medium tracking-widest text-zinc-400 dark:text-zinc-500">
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

        {/* Footer */}
        <footer className="mt-24 border-t border-zinc-100 pt-8 dark:border-zinc-800">
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} ilkhoeri. Open source with ❤️
          </p>
        </footer>
      </main>
    </div>
  );
}

const linklist = [
  {
    href: "/projects/",
    tit: "Projects",
    sub: "Explore my projects and experiments",
    icon: <BlueprintHelmetIcon />
  },
  {
    href: "/templates/",
    tit: "Templates",
    sub: "Collection of ready-to-use templates",
    icon: <BookOpenIcon />
  }
  // {
  //   href: "https://oerilabs.vercel.app/learn/",
  //   tit: "Learning Center",
  //   sub: "Tutorials and interactive learning",
  //   icon: <Code2Icon />
  // }
];

interface CompProps {
  href: string;
  tit: string;
  sub: string;
  icon: React.ReactNode;
}
export function LinkList(props: CompProps) {
  const { href, tit, sub, icon } = props;
  return (
    <Link
      href={href}
      className="group flex items-center justify-between border-b border-zinc-100 pb-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-600">
      <div className="flex items-center gap-4">
        <span className="[&>svg]:size-5 text-zinc-400 transition-colors group-hover:text-black dark:group-hover:text-white">
          {icon}
        </span>
        <div className="grid">
          <span className="font-medium text-black dark:text-white">{tit}</span>
          <span className="text-sm text-zinc-500">{sub}</span>
        </div>
      </div>
      <ArrowUpRightIcon className="h-4 w-4 text-zinc-300 transition-all group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-zinc-600 dark:group-hover:text-white" />
    </Link>
  );
}
