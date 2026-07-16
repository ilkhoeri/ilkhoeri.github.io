import { AllTopics } from "@/routes";

const specialTags = "ilkhoeri";

export function filterTopics(url: string | string[], data: AllTopics) {
  const segments = Array.isArray(url) ? url : url.split("/").filter(Boolean);
  return data.filter(item => {
    const topicSet = new Set(item?.topics);
    return segments.every(segment => topicSet.has(segment));
  });
}

export function findTopic(url: string | string[], data: AllTopics) {
  const segments = Array.isArray(url) ? url : url.split("/").filter(Boolean);
  return data.find(item => {
    const topicSet = new Set(item.topics);
    return segments.every(segment => topicSet.has(segment));
  });
}

export interface Repos {
  title: string;
  description: string;
  homepage: string;
  href: string;
  topics?: string[];
  isFork?: boolean;
  license?: string;
  createdAt: string;
  language?: string;
  languageColor?: string;
}

export function filterRepos(repos: any): Repos[] {
  const projects: Repos[] = repos
    .filter(
      (repo: any) =>
        repo.topics && repo.topics.length > 0 && repo.name !== specialTags
    )
    // .filter((repo: any) => repo.topics?.includes(specialTags))
    .map(
      (repo: any): Repos => ({
        title: repo.name,
        description: repo.description || "No description",
        homepage: repo.homepage,
        href: repo.html_url,
        topics:
          repo.topics?.filter((topic: string) => topic !== specialTags) || [],
        isFork: repo.fork,
        license: repo.license?.name,
        language: repo.primaryLanguage?.name,
        languageColor: repo.primaryLanguage?.color,
        createdAt: repo.created_at
      })
    );

  return projects;
}
