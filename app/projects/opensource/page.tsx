import ProjectsView from "@/components/ProjectsView";

export default function OpenSourceProjects() {
  return (
    <main>
      <h2 className="pb-4 text-3xl">Open Source Projects</h2>
      <ProjectsView type="opensource" />
    </main>
  );
}
