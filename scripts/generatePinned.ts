import fs from "fs";
import fetch from "node-fetch";
import path from "path";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function main() {
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
    body: JSON.stringify({ query })
  });

  const data = await res.json();

  // transform data: map topics dan primaryLanguage
  const repos = (data as any).data.user.pinnedItems.edges.map((edge: any) => {
    const repo = edge.node;
    return {
      name: repo.name,
      description: repo.description,
      url: repo.url,
      stargazerCount: repo.stargazerCount,
      forkCount: repo.forkCount,
      primaryLanguage: repo.primaryLanguage
        ? { name: repo.primaryLanguage.name, color: repo.primaryLanguage.color }
        : null,
      topics: repo.repositoryTopics.edges.map((e: any) => e.node.topic.name)
    };
  });

  // simpan ke public folder supaya bisa diakses statis
  const filePath = path.join(process.cwd(), "public", "pinned.json");
  fs.writeFileSync(filePath, JSON.stringify(repos, null, 2));
  console.log("Pinned repos JSON generated at public/pinned.json");
}

main();
