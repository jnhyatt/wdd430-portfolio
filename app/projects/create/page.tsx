import { createProject } from "@/app/lib/actions";
import ProjectForm from "@/components/ProjectForm";

export default function Page() {
  return (
    <main>
      <h2 className="pb-4 text-3xl">Create Project</h2>
      <ProjectForm action={createProject} submitLabel="Save Project" />
    </main>
  );
}
