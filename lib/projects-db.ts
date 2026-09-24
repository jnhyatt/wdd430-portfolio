import { sql } from "@vercel/postgres";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link: string;
}

export async function getProjects(type?: Project["type"]): Promise<Project[]> {
  const { rows } = await sql<Project>`
    select
      p.id,
      p.title,
      p.description,
      p.type,
      p.link,
      array(
        select t.technology
        from project_technologies t
        where t.project_id = p.id
        order by t.technology
      ) as technologies
    from projects p
    where (${type ?? null}::text is null or p.type::text = ${type ?? null})
    order by p.id
  `;
  return rows;
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await sql<Project>`
    select
      p.id,
      p.title,
      p.description,
      p.type,
      p.link,
      array(
        select t.technology
        from project_technologies t
        where t.project_id = p.id
        order by t.technology
      ) as technologies
    from projects p
    where p.id = ${id}
  `;
  return rows[0] ?? null;
}
