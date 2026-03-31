import { ContentPage } from "@/components/content-component";
import { PackageIcon } from "@/components/icons";
import { getRepos } from "@/lib/get";

const specialTags = "ilkhoeri";

// export const dynamic = "force-dynamic"; // menandai halaman harus di-render di server runtime

export default async function ProjectsPage() {
  const repos = await getRepos();

  const projects = repos
    .filter((repo: any) => repo.topics && repo.topics.length > 0)
    // .filter((repo: any) => repo.topics?.includes(specialTags))
    .map((repo: any) => ({
      title: repo.name,
      description: repo.description || "No description",
      href: repo.html_url,
      tags: repo.topics?.filter((tag: string) => tag !== specialTags) || [],
      isFork: repo.fork
    }));

  return (
    <ContentPage
      title="Projects"
      subtitle="A collection of my projects"
      description="Explore the complete documentation for each open-source project available."
      data={projects}
    />
  );
}

const projectsX = [
  {
    title: "ioeri",
    description:
      "Koleksi komponen React yang dapat digunakan kembali dengan desain modern dan aksesibilitas tinggi.",
    href: "https://ilkhoeri.github.io/ioeri",
    icon: PackageIcon,
    tags: ["React", "Components", "UI"]
  },
  {
    title: "cretex",
    description:
      "Utilitas CSS-in-JS ringan untuk membuat class dinamis dengan TypeScript support.",
    href: "https://ilkhoeri.github.io/cretex",
    // icon: Palette,
    tags: ["CSS", "Utility", "TypeScript"]
  },
  {
    title: "xuxi",
    description:
      "Kumpulan hooks React yang powerful untuk state management dan side effects.",
    href: "https://ilkhoeri.github.io/xuxi",
    // icon: Puzzle,
    tags: ["Hooks", "React", "State"]
  },
  {
    title: "str-merge",
    description:
      "Utilitas untuk menggabungkan string dan class names dengan conditional logic.",
    href: "https://ilkhoeri.github.io/str-merge",
    // icon: Layers,
    tags: ["Utility", "String", "Merge"]
  },
  {
    title: "cvax",
    description:
      "Variant API untuk membuat komponen dengan multiple variants dan compound variants.",
    href: "https://ilkhoeri.github.io/cvax",
    // icon: Zap,
    tags: ["Variants", "API", "Components"]
  },
  {
    title: "CLI Tools",
    description:
      "Command-line tools untuk scaffolding dan automasi workflow development.",
    href: "https://ilkhoeri.github.io/cli",
    // icon: Terminal,
    tags: ["CLI", "Tools", "Automation"]
  }
];
