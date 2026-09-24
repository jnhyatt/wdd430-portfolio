import { Suspense } from "react";
import ProjectListSkeleton from "@/components/ProjectListSkeleton";
import ProjectsView from "@/components/ProjectsView";

export default function Projects() {
  return (
    <main>
      <h2 className="pb-4 text-3xl">Projects Overview</h2>
      <Suspense fallback={<ProjectListSkeleton />}>
        <ProjectsView />
      </Suspense>
    </main>
  );
}
