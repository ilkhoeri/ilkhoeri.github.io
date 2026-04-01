"use client";

import { getRepos } from "@/lib/get";
import { useEffect, useState } from "react";
import { ContentWithSearchPage } from "@/components/client-search";
import { ProjectProps } from "@/components/component-content";

const specialTags = "ilkhoeri";

export default function ProjectsPageClient() {
  const [projects, setProjects] = useState<ProjectProps[] | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      const repos = await getRepos();

      const projectsData: ProjectProps[] = repos
        .filter((repo: any) => repo.topics && repo.topics.length > 0)
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

      setProjects(projectsData);
    }

    fetchProjects();
  }, []);

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
