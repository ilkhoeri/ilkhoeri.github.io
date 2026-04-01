"use client";

import { useState, useMemo } from "react";
import {
  ArrowLeftIcon,
  LayerIcon,
  PackageIcon,
  PaletteIcon,
  PuzzleIcon,
  SearchIcon,
  TerminalIcon,
  XMarkIcon,
  ZapIcon
} from "./icons";
import Link from "next/link";
import {
  AdditionalResources,
  ContentCard,
  ProjectProps,
  ContentPageProps,
  FooterLines
} from "./component-content";
import { cn } from "@/lib/utils";

export function useSearchProjects(projects: ProjectProps[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique tags
  const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).sort();

  const filteredProjects = useMemo(() => {
    return projects?.filter(project => {
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      const tags = project.tags || [];
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some(tag => tags?.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery !== "" || selectedTags.length > 0;

  return {
    searchQuery,
    setSearchQuery,
    allTags,
    selectedTags,
    filteredProjects,
    toggleTag,
    clearFilters,
    hasActiveFilters
  };
}

export function ContentWithSearchPage(props: ContentPageProps) {
  const { title, description, subtitle, data } = props;
  const {
    filteredProjects,
    toggleTag,
    clearFilters,
    hasActiveFilters,
    allTags,
    searchQuery,
    selectedTags,
    setSearchQuery
  } = useSearchProjects(data);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        {/* Back Link */}
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-black dark:hover:text-white">
          <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-black dark:text-white sm:text-4xl">
            {title}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        </header>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-10 text-sm text-black placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-zinc-600"
            />
            {searchQuery && (
              <button
                aria-label="close"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Filter:
            </span>
            {allTags.map(tag => {
              if (!tag) return null;
              return (
                <button
                  aria-label={tag}
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    selectedTags.includes(tag)
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                  )}>
                  {tag}
                </button>
              );
            })}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                aria-label="Clear Filters"
                className="cursor-pointer ml-2 text-xs text-zinc-500 underline underline-offset-2 hover:text-black dark:hover:text-white">
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            {subtitle && (
              <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {subtitle}
              </h2>
            )}
            {filteredProjects && filteredProjects?.length > 0 && (
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {filteredProjects?.length} dari {data.length}
              </span>
            )}
          </div>

          {filteredProjects?.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredProjects.map(project => {
                return (
                  <ContentCard
                    key={project.title}
                    {...project}
                    selectedTags={selectedTags}
                  />
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-zinc-200 py-12 text-center dark:border-zinc-800">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No projects found.
              </p>
              {(searchQuery || selectedTags?.length > 0) && (
                <button
                  aria-label="clear-filters"
                  onClick={clearFilters}
                  className="cursor-pointer mt-2 text-sm text-black underline underline-offset-2 dark:text-white">
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </section>

        {/* Additional Resources */}
        <AdditionalResources />
        {/* Footer */}
        <FooterLines />
      </main>
    </div>
  );
}
