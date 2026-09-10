import { ProjectCardProps } from "@/components/ProjectCard";
import ProjectList from "@/components/ProjectList";

const projects: ProjectCardProps[] = [
  {
    title: "Maze",
    description: "A recreation of that old Windows maze screensaver in OpenGL",
    technologies: ["C", "Rust", "OpenGL"],
    link: "https://github.com/jnhyatt/maze",
  },
  {
    title: "One Bit",
    description: "My submission to the 1-Bit Jam 6 game jam",
    technologies: ["Rust", "Bevy", "WebGPU"],
    link: "https://github.com/jnhyatt/one-bit",
  },
  {
    title: "Ray Tracer",
    description: "Learning Typescript by building a ray tracer",
    technologies: ["Typescript"],
    link: "https://github.com/jnhyatt/raytracer-ts",
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="py-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">My Portfolio</h1>
        <p className="text-lg text-gray-400">
          I'm a full-stack developer learning Next.js and React. Here are some
          of my recent projects.
        </p>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
}
