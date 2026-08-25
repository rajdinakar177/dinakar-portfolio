import type { Project } from "@/types/project";

const GITHUB_API_URL = "https://api.github.com";
const DEFAULT_REVALIDATION_SECONDS = 3600;
const MAX_PROJECTS = 6;

type GitHubRepositoryResponse = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  pushed_at: string | null;
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

function getGitHubHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "professional-portfolio",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function normalizeRepository(repository: GitHubRepositoryResponse): Project {
  const technologies = Array.from(
    new Set(
      [repository.language, ...(repository.topics ?? []).slice(0, 5)].filter(
        (value): value is string => Boolean(value)
      )
    )
  );

  return {
    id: String(repository.id),
    slug: repository.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: repository.name,
    description:
      repository.description?.trim() ||
      "A GitHub project by the portfolio owner.",
    technologies,
    githubUrl: repository.html_url,
    liveUrl: repository.homepage || undefined,
    featured: false,
    source: "github",
  };
}

export async function getGitHubProjects(): Promise<Project[]> {
  const username = process.env.GITHUB_USERNAME;
  if (!username) return [];

  const url = new URL(
    `${GITHUB_API_URL}/users/${encodeURIComponent(username)}/repos`
  );
  url.searchParams.set("per_page", "100");
  url.searchParams.set("sort", "pushed");
  url.searchParams.set("direction", "desc");

  const revalidation =
    Number(process.env.GITHUB_REVALIDATE_SECONDS) ||
    DEFAULT_REVALIDATION_SECONDS;

  try {
    const response = await fetch(url, {
      headers: getGitHubHeaders(),
      next: { revalidate: revalidation },
    });

    if (!response.ok) {
      console.error(
        `GitHub API request failed: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const repositories = (await response.json()) as GitHubRepositoryResponse[];

    return repositories
      .filter((repository) => !repository.fork && !repository.archived)
      .slice(0, MAX_PROJECTS)
      .map(normalizeRepository);
  } catch (error) {
    console.error("Unable to fetch GitHub repositories.", error);
    return [];
  }
}