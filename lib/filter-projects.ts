const specialTags = "ilkhoeri";

export function filteredRepos(repos: any) {
  const projects = repos
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

  return projects;
}
