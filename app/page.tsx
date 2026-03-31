// "use client";

import Link from "next/link";
import { allPages, Page } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer2/hooks";
import { notFound } from "next/navigation";
import { getTableOfContents } from "@/components/content/config";
import { Mdx } from "@/components/content/mdx-component";
import { compareDesc, format, parseISO } from "@/lib/dates";
import { HomeCompt } from "@/components/home-component";

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
//   return [
//     { app: [] }, // <-- root path
//     // ...allPages.map(page => ({ app: [page._raw.flattenedPath] }))

//     ...allPages.map(page => ({
//       app: page._raw.flattenedPath.split("/") // untuk nested paths
//     }))
//   ];
// }

// For dynamic routes, you MUST implement generateStaticParams()
// export function generateStaticParams() {
//   // If you have dynamic segments, generate all possible paths
//   // For example, if you have a blog with known slugs:
//   return [
//     { app: [""] }, // Default/home route
//     { app: ["about"] },
//     { app: ["contact"] }
//     // Add all your known routes here
//   ];
// }

// Alternatively, for catch-all routes, you can do:
// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { app: [""] } },
//       { params: { app: ["about"] } },
//       { params: { app: ["contact"] } }
//     ],
//     fallback: false
//   };
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

  // console.log(
  //   allPages.map(page => [
  //     {
  //       app: page._raw.flattenedPath
  //     }
  //   ])
  // );

  if (!slug || slug.length === 0) {
    return <HomeCompt />;
  }

  if (!posts) {
    notFound();
  }

  const toc = await getTableOfContents(posts.body.raw);

  return (
    <article className="py-8 mx-auto">
      <Mdx code={posts.body.code} />

      <time dateTime={post?.date} className="mb-1 text-xs text-gray-600">
        {format(parseISO(post?.date), "LLLL d, yyyy")}
      </time>
    </article>
  );
}
