import Link from "next/link";
import { allPages, Page } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer2/hooks";
import { notFound } from "next/navigation";
import { DashboardTableOfContents } from "@/components/toc/toc";
import { getTableOfContents } from "@/components/toc/config";
import { Mdx } from "@/components/toc/mdx-component";
import { compareDesc, format, parseISO } from "@/lib/dates";

export const dynamic = 'force-static'
function PostCard(post: Page) {
  const Content = getMDXComponent(post.body.code);

  return (
    <div className="mb-8">
      <h2 className="text-xl">
        <Link href={post.url} className="text-blue-500 hover:text-blue-700">
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="block mb-2 text-xs text-gray-600">
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
      <div className="text-sm">
        <Content />
      </div>
    </div>
  );
}

interface SlugParams {
  params: Promise<{ app: string[] }>;
}

// export async function generateStaticParams() {
//   return allPosts.map(post => ({ slug: post._raw.flattenedPath }));
// }

async function getPathFromParams({ params }: SlugParams) {
  const slug = (await params).app?.join("/") || "";
  // const posts = allPosts.find(post => post.slugAsParams === slug); // slugAsParams change of nested routes become single route
  const posts = allPages.find(page => page.slug === slug);

  if (!posts) {
    return null;
  }

  return posts;
}

export async function generateMetadata({ params }: SlugParams) {
  const slug = (await params).app;
  const post = allPages.find(page => slug?.includes(page._raw.flattenedPath));
  return { title: post?.title };
}

export default async function Home({ params }: SlugParams) {
  const slug = (await params).app;
  const post = allPages.find(page => slug?.includes(page._raw.flattenedPath));

  const posts = await getPathFromParams({ params });

  const sortPage = allPages.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  // return (
  //   <div className="max-w-xl py-8 mx-auto">
  //     <h1 className="mb-8 text-3xl font-bold text-center">Next.js Example</h1>

  //   </div>
  // );

  if (!posts) {
    notFound();
  }

  const toc = await getTableOfContents(posts.body.raw);

  // const Content = getMDXComponent(posts?.body?.code);

  return (
    <article className="py-8 mx-auto max-w-xl">
      <div className="mb-8 text-center">
        <time dateTime={post?.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post?.date), "LLLL d, yyyy")}
        </time>
        <h1>{String(post?.title)}</h1>
        <h2>slug: {String(posts?.slug)}</h2>
      </div>

      {sortPage.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}

      {posts.toc && <DashboardTableOfContents toc={toc} />}

      <Mdx code={posts.body.code} />
      {/* <Content /> */}
    </article>
  );
}
