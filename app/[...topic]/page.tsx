import fs from "fs";
import path from "path";
import { allTopics, GENERATED_EXPORT_PATH } from "@/routes";
import { filterRepos, filterTopics, findTopic } from "@/lib/filter-projects";
import { ContentPage } from "@/components/component-content";
import { notFound } from "next/navigation";

interface PageParams {
  params: Promise<{ topic: string[] }>;
}

export async function generateStaticParams() {
  return allTopics.map(obj => ({ topic: obj.topics }));
}

export default async function TopicPage(props: PageParams) {
  const params = await props.params;
  const publicPath = path.join(
    process.cwd(),
    GENERATED_EXPORT_PATH,
    "publicRepos.json"
  );

  if (!fs.existsSync(publicPath)) {
    return (
      <div className="h-dvh w-full flex items-center justify-center">
        <span className="m-auto">Empty projects...</span>
      </div>
    );
  }

  const publicRepos = JSON.parse(fs.readFileSync(publicPath, "utf-8"));
  const page = findTopic(params.topic, allTopics);
  const projects = filterRepos(filterTopics(params.topic, publicRepos));
  // const projects = filterRepos(
  //   publicRepos.filter((repo: any) =>
  //     repo.topics?.includes(params.topic.join("/"))
  //   )
  // );

  if (!page || !projects) notFound();

  return (
    <ContentPage
      title={page.title}
      description={page.description}
      subtitle={page.subtitle}
      data={projects}
    />
  );
}
