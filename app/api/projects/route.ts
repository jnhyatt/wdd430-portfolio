import { getProjects } from "@/lib/projects-db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return new Response(
    JSON.stringify(await getProjects(request.nextUrl.searchParams.get("type"))),
    { headers: { "Content-Type": "application/json" } },
  );
}
