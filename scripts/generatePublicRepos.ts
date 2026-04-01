import fs from "fs";
import path from "path";

async function main() {
  const username = "ilkhoeri"; // ganti dengan username GitHub-mu
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await res.json();

  // Pilih fields yang mau ditampilkan
  const repos = data;

  // Simpan ke public folder
  const filePath = path.join(process.cwd(), "public", "publicRepos.json");
  fs.writeFileSync(filePath, JSON.stringify(repos, null, 2));
  console.log("Public repos JSON generated at public/publicRepos.json");
}

main();
