import fs from "fs";
import path from "path";
import { ContentWithSearchPage } from "@/components/client-search";
import { filteredRepos } from "@/lib/filter-projects";

const specialTags = "ilkhoeri";

export default function ProjectsPageClient() {
  const publicPath = path.join(
    process.cwd(),
    "public/content",
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
  const projects = filteredRepos(publicRepos);

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
