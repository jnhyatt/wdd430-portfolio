import { notFound } from "next/navigation";
import { updateProject } from "@/app/lib/actions";
import ProjectForm from "@/components/ProjectForm";
import { getProjectById } from "@/lib/projects-db";

export default async function Page(props: PageProps<"/projects/[id]/edit">) {
  const { id: idParam } = await props.params;
  if (!/^\d+$/.test(idParam)) {
    notFound();
  }
  const id = Number(idParam);
  const project = await getProjectById(id);
  if (project == null) {
    notFound();
  }

  return (
    <main>
      <h2 className="pb-4 text-3xl">Edit Project</h2>
      <ProjectForm
        action={updateProject.bind(null, id)}
        project={project}
        submitLabel="Update Project"
      />
    </main>
  );
}
