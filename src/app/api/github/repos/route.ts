import { NextResponse } from "next/server";

import { getGitHubProjects } from "@/services/github";

export async function GET() {
  if (!process.env.GITHUB_USERNAME) {
    return NextResponse.json(
      {
        success: false,
        projects: [],
        error: "GitHub username is not configured.",
      },
      { status: 503 }
    );
  }

  const projects = await getGitHubProjects();

  return NextResponse.json({
    success: true,
    projects,
  });
}
