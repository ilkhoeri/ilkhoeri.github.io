import {
  CombineIcon,
  CompassIcon,
  GridPlusIcon,
  IconProps,
  LayerIcon,
  NetworkIcon,
  PaletteIcon,
  PuzzleIcon,
  TerminalIcon,
  TurborepoIcon,
  ZapIcon
} from "@/components/icons";

const iconGroups: [React.ComponentType, string[]][] = [
  [PaletteIcon, ["ui-components", "ui"]],
  [TerminalIcon, ["cli"]],
  [CompassIcon, ["utilities", "utility"]],
  [PuzzleIcon, ["templates", "template"]],
  [GridPlusIcon, ["icons"]],
  [LayerIcon, ["layers", "layer"]],
  [NetworkIcon, ["workspace"]],
  [TurborepoIcon, ["turborepo"]],
  [ZapIcon, ["variant", "variants", "api"]],
  [CombineIcon, ["merge", "string-merging", "mergedeep"]]
];

// Generate map automatically
const tagIconMap: Record<string, React.ComponentType> = {};
for (const [icon, tags] of iconGroups) {
  for (const tag of tags) {
    tagIconMap[tag] = icon;
  }
}

export function getIconFromTagsX(
  tags?: string[]
): React.ComponentType<IconProps> | null {
  if (!tags || tags.length === 0) return null;
  for (const tag of tags) {
    if (tagIconMap[tag]) return tagIconMap[tag];
  }
  return null;
}

export function getIconFromTags(
  tags?: string[]
): React.ComponentType<IconProps> | null {
  if (!tags || tags.length === 0) return null;

  // cari ikon pertama yang cocok dengan salah satu tag
  for (const tag of tags) {
    const match = iconGroups.find(([_, groupTags]) => groupTags.includes(tag));
    if (match) return match[0];
  }

  return null;
}
