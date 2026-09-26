import ProjectCard, { ProjectCardProps } from "./ProjectCard";

export interface ProjectListProps {
  projects: ProjectCardProps[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id ?? project.link} {...project} />
      ))}
    </section>
  );
}
