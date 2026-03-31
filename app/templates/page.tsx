import { ContentPage } from "@/components/content-component";
import { getRepos } from "@/lib/get";

const specialTags = "ilkhoeri";

export default async function TemplatesPage() {
  const repos = await getRepos();

  const projects = repos
    .filter((repo: any) => repo.topics && repo.topics.length > 0)
    .filter((repo: any) => repo.topics?.includes("templates"))
    .map((repo: any) => ({
      title: repo.name,
      description: repo.description || "No description",
      href: repo.html_url,
      tags: repo.topics?.filter((tag: string) => tag !== specialTags) || [],
      isFork: repo.fork
    }));

  return (
    <ContentPage
      title="Templates"
      subtitle="A templates of my collection"
      description="Explore collection of ready-to-use templates"
      data={projects}
    />
  );
}
