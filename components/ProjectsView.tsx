"use client";

import { useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import type { Project } from "@/lib/projects-db";

export interface ProjectsViewProps {
  type?: Project["type"];
}

export default function ProjectsView({ type }: ProjectsViewProps) {
  const [projects, setProjects] = useState<Project[] | "error" | null>(null);

  const populate = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) setProjects("error");
    setProjects(await res.json());
  };

  useEffect(() => {
    populate(type ? `/api/projects?type=${type}` : "/api/projects");
  }, [type]);

  if (projects === "error") {
    return <p className="text-red-400">Failed to load projects.</p>;
  }
  if (projects === null) {
    return <p className="text-gray-400">Loading projects...</p>;
  }
  return <ProjectList projects={projects} />;
}
