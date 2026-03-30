import {
  ArrowUpRightIcon,
  BookOpenIcon,
  Code2Icon,
  FileTextIcon
} from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

export function HomeCompt() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
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
            Selamat datang di dokumentasi dan koleksi proyek open-source saya.
            Di sini Anda akan menemukan berbagai template, komponen, dan panduan
            untuk membantu Anda membangun aplikasi web modern.
          </p>
        </section>

        {/* Quick Links */}
        <section className="mb-16">
          <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Mulai dari sini
          </h2>

          <div className="space-y-4">
            <a
              href="https://ilkhoeri.github.io/docs"
              className="group flex items-center justify-between border-b border-zinc-100 pb-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-600">
              <div className="flex items-center gap-4">
                <FileTextIcon className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-black dark:group-hover:text-white" />
                <div>
                  <span className="font-medium text-black dark:text-white">
                    Documentation
                  </span>
                  <p className="text-sm text-zinc-500">
                    Panduan lengkap dan referensi API
                  </p>
                </div>
              </div>
              <ArrowUpRightIcon className="h-4 w-4 text-zinc-300 transition-all group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-zinc-600 dark:group-hover:text-white" />
            </a>

            <a
              href="https://oerilabs.vercel.app/"
              className="group flex items-center justify-between border-b border-zinc-100 pb-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-600">
              <div className="flex items-center gap-4">
                <BookOpenIcon className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-black dark:group-hover:text-white" />
                <div>
                  <span className="font-medium text-black dark:text-white">
                    Templates
                  </span>
                  <p className="text-sm text-zinc-500">
                    Koleksi template siap pakai
                  </p>
                </div>
              </div>
              <ArrowUpRightIcon className="h-4 w-4 text-zinc-300 transition-all group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-zinc-600 dark:group-hover:text-white" />
            </a>

            <a
              href="https://oerilabs.vercel.app/learn"
              className="group flex items-center justify-between border-b border-zinc-100 pb-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-600">
              <div className="flex items-center gap-4">
                <Code2Icon className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-black dark:group-hover:text-white" />
                <div>
                  <span className="font-medium text-black dark:text-white">
                    Learning Center
                  </span>
                  <p className="text-sm text-zinc-500">
                    Tutorial dan pembelajaran interaktif
                  </p>
                </div>
              </div>
              <ArrowUpRightIcon className="h-4 w-4 text-zinc-300 transition-all group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-zinc-600 dark:group-hover:text-white" />
            </a>
          </div>
        </section>

        {/* CTA Buttons */}
        <section className="flex flex-col gap-3 sm:flex-row">
          <a
            href="https://github.com/ilkhoeri"
            target="_blank"
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
          </a>
          <a
            href="https://ilkhoeri.github.io/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-6 text-sm font-medium text-black transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900">
            Lihat Dokumentasi
          </a>
        </section>

        {/* Footer */}
        <footer className="mt-24 border-t border-zinc-100 pt-8 dark:border-zinc-800">
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} ilkhoeri. Open source dengan ❤️
          </p>
        </footer>
      </main>
    </div>
  );
}

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
