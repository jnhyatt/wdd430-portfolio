import { Suspense } from "react";
import ProjectListSkeleton from "@/components/ProjectListSkeleton";
import ProjectsView from "@/components/ProjectsView";

export default function SchoolProjects() {
  return (
    <main>
      <h2 className="pb-4 text-3xl">School Projects</h2>
      <Suspense fallback={<ProjectListSkeleton />}>
        <ProjectsView type="school" />
      </Suspense>
    </main>
  );
}
