import { getProjects } from "@/lib/projects-db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const typeParam = request.nextUrl.searchParams.get("type");
  const type =
    typeParam === "school" || typeParam === "opensource"
      ? typeParam
      : undefined;
  return new Response(JSON.stringify(await getProjects(type)), {
    headers: { "Content-Type": "application/json" },
  });
}
