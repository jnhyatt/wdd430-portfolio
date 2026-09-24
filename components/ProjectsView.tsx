import ProjectList from "./ProjectList";
import { getProjects, type Project } from "@/lib/projects-db";

export interface ProjectsViewProps {
  type?: Project["type"];
}

export default async function ProjectsView({ type }: ProjectsViewProps) {
  return <ProjectList projects={await getProjects(type)} />;
}
