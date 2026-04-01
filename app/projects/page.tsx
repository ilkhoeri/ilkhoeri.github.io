import fs from "fs";
import path from "path";
import { ContentWithSearchPage } from "@/components/client-search";

const specialTags = "ilkhoeri";

export default function ProjectsPageClient() {
  const publicPath = path.join(process.cwd(), "public", "publicRepos.json");
  const publicRepos = JSON.parse(fs.readFileSync(publicPath, "utf-8"));

  const projects = publicRepos
    .filter((repo: any) => repo.topics && repo.topics.length > 0)
    // .filter((repo: any) => repo.topics?.includes(specialTags))
    .map((repo: any) => ({
      title: repo.name,
      description: repo.description || "No description",
      href: repo.html_url,
      tags: repo.topics?.filter((tag: string) => tag !== specialTags) || [],
      isFork: repo.fork,
      homepage: repo.homepage,
      license: repo.license?.name,
      language: repo.primaryLanguage?.name,
      color: repo.primaryLanguage?.color
    }));

  if (!projects) {
    return (
      <div className="h-dvh w-full flex items-center justify-center">
        <span className="m-auto">Loading projects...</span>
      </div>
    );
  }

  return (
    <ContentWithSearchPage
      title="Projects"
      subtitle="A collection of my projects"
      description="Explore the complete documentation for each open-source project available."
      data={projects}
    />
  );
}
