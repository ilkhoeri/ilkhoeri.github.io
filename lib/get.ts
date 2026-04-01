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

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function fetchPinnedRepos() {
  const query = `
    query {
  user(login: "ilkhoeri") {
    pinnedItems(first: 6, types: REPOSITORY) {
      edges {
        node {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            repositoryTopics(first: 10) {
              edges {
                node {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_TOKEN}`
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 }
  });

  const data = await res.json();
  return data.data.user.pinnedItems.edges.map((edge: any) => edge.node);
}
