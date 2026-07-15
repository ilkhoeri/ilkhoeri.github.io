import { mkdir, writeFile } from "node:fs/promises";
import { basename, dirname } from "node:path";

const RAW_URL =
  "https://raw.githubusercontent.com/ilkhoeri/ilkhoeri/refs/heads/master/README.md";

const OUTPUT = "md/me.mdx";

async function main() {
  const response = await fetch(RAW_URL);

  if (!response.ok) {
    throw new Error(`Failed: ${response.status}`);
  }

  const content = await response.text();

  const filename = basename(OUTPUT, ".mdx");
  const date = new Date().toISOString().slice(0, 10);

  const result = `---\ntitle: ${filename}\ndate: ${date}\n---\n\n${content}\n`;

  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, result, "utf8");

  console.log(`Generated ${OUTPUT}`);
}

main().catch(console.error);
