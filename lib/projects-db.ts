export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Bevy Contributions",
    description:
      "My contributions to the Bevy game engine. Mostly documentation or small cleanup tasks I saw lying around.",
    type: "opensource",
    technologies: ["Rust", "Bevy"],
    link: "https://github.com/bevyengine/bevy/issues/?q=author%3Ajnhyatt",
  },
  {
    id: 2,
    title: "Ray Tracer",
    description:
      "A super simple, physically-based ray tracer written in Typescript.",
    type: "school",
    technologies: ["Typescript", "Node.js"],
    link: "https://github.com/jnhyatt/raytracer-ts",
  },
];

export function getProjects(type?: string | null): Project[] {
  return type ? projects.filter((p) => p.type === type) : projects;
}

export function getProjectById(id: number): Project | null {
  return projects.find((p) => p.id === id) ?? null;
}
