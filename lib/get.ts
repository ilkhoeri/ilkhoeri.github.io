export async function getRepos() {
  const res = await fetch("https://api.github.com/users/ilkhoeri/repos", {
    headers: {
      Accept: "application/vnd.github+json"
    },
    next: { revalidate: 60 } // ISR (opsional)
    // cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch repos");
  }

  return res.json();
}
