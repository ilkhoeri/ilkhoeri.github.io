import fs from "fs";
import path from "path";
import { GENERATED_EXPORT_PATH } from "../routes";

const username = process.env.GITHUB_USERNAME;

async function main() {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await res.json();

  // Pilih fields yang mau ditampilkan
  const repos = data;

  // Simpan ke public folder
  const filePath = path.join(
    process.cwd(),
    GENERATED_EXPORT_PATH,
    "publicRepos.json"
  );
  fs.writeFileSync(filePath, JSON.stringify(repos, null, 2));
  console.log(
    `✨ Public repos JSON generated at ${GENERATED_EXPORT_PATH}/publicRepos.json`
  );
}

main();
