import fs from "fs";
import path from "path";
import { GENERATED_EXPORT_PATH } from "@/routes";
import { filteredRepos } from "@/lib/filter-projects";
import { ContentPage } from "@/components/component-content";

export default async function TemplatesPage() {
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

  const projects = filteredRepos(
    publicRepos.filter((repo: any) => repo.topics?.includes("templates"))
  );

  return (
    <ContentPage
      title="Templates"
      description="Explore collection of ready-to-use templates"
      subtitle="A templates of my collection"
      data={projects}
    />
  );
}
