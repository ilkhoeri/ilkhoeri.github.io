import { BookOpenIcon, ExperimentIcon, SvgProps } from "./components/icons";

export const GENERATED_EXPORT_PATH = "public/content";

export type TopicBase = {
  topics: string[];
  url: string;
  title: string;
  description: string;
  subtitle: string;
};
interface Topic extends TopicBase {
  icon: (props: SvgProps) => React.JSX.Element;
  shortDesc: string;
}
export type AllTopics = TopicBase[];
export type AllTopicWithIcon = Topic[];

export const allTopics: AllTopicWithIcon = [
  {
    title: "Templates",
    topics: ["templates"],
    url: "/templates/",
    icon: BookOpenIcon,
    description: "Explore collection of ready-to-use templates",
    shortDesc: "Collection of ready-to-use templates",
    subtitle: "A templates of my collection"
  },
  {
    title: "Experiments",
    topics: ["experimental"],
    url: "/experimental/",
    icon: ExperimentIcon,
    description: "Explore collection of my experimental projects",
    shortDesc: "Collection of my experimental projects",
    subtitle: "A experiments of my collection"
  }
];

//
type TopicItem = {
  id: string;
  topics: string[];
  title: string;
  url: string;
};
const data = [
  {
    id: "1",
    topics: ["templates"],
    title: "Templates"
  },
  {
    id: "2",
    topics: ["templates", "ui"]
  },
  {
    id: "3",
    topics: ["templates", "frontend"]
  },
  {
    id: "4",
    topics: ["templates", "frontend", "ui"]
  },
  {
    id: "5",
    topics: ["experimental", "templates"]
  }
];

type TopicIndex = {
  byTopic: Map<string, Set<string>>;
  byId: Map<string, TopicItem>;
};

function buildTopicIndex(data: TopicItem[]): TopicIndex {
  const byTopic = new Map<string, Set<string>>();
  const byId = new Map<string, TopicItem>();

  for (const item of data) {
    byId.set(item.id, item);

    for (const keyword of item.topics) {
      if (!byTopic.has(keyword)) {
        byTopic.set(keyword, new Set());
      }

      byTopic.get(keyword)!.add(item.id);
    }
  }

  return { byTopic, byId };
}
