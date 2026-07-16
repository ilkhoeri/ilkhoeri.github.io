import fs from "fs";
import path from "path";
import { GENERATED_EXPORT_PATH } from "@/routes";
import { filterRepos } from "@/lib/filter-projects";
import { ContentWithSearchPage } from "@/components/client-search";

export default function ProjectsPageClient() {
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
  const projects = filterRepos(publicRepos);

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
      description="Explore the complete documentation for each open-source project available."
      subtitle="A collection of my projects"
      data={projects}
    />
  );
}
