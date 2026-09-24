import { getProjectById } from "@/lib/projects-db";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = Number.parseInt((await params).id);
  if (isNaN(id)) {
    return new Response(null, { status: 400 });
  }
  const project = await getProjectById(id);
  if (project == null) {
    return new Response(null, { status: 404 });
  }
  return new Response(JSON.stringify(project), {
    headers: { "Content-Type": "application/json" },
  });
}
