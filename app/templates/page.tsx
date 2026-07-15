import fs from "fs";
import path from "path";
import { ContentWithSearchPage } from "@/components/client-search";
import { ContentPage } from "@/components/component-content";
import { filteredRepos } from "@/lib/filter-projects";
import { getRepos } from "@/lib/get";

const specialTags = "ilkhoeri";

export default async function TemplatesPage() {
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

  const projects = filteredRepos(
    publicRepos.filter((repo: any) => repo.topics?.includes("templates"))
  );

  return (
    <>
      <ContentPage
        title="Templates"
        subtitle="A templates of my collection"
        description="Explore collection of ready-to-use templates"
        data={projects}
      />
    </>
  );
}
