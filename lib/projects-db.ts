import { db, sql, type VercelPoolClient } from "@vercel/postgres";

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

export type ProjectInput = Omit<Project, "id">;

// I did a weird thing with `technologies` and made it its own table. Now here I
// am having to use transactions to make sure everything stays in sync.
async function withTransaction<T>(
  fn: (client: VercelPoolClient) => Promise<T>,
): Promise<T> {
  const client = await db.connect();
  try {
    await client.sql`begin`;
    const result = await fn(client);
    await client.sql`commit`;
    return result;
  } catch (error) {
    await client.sql`rollback`;
    throw error;
  } finally {
    client.release();
  }
}

export async function insertProject(project: ProjectInput): Promise<number> {
  return withTransaction(async (client) => {
    const { rows } = await client.sql<{ id: number }>`
      insert into projects (title, description, type, link)
      values (${project.title}, ${project.description}, ${project.type}, ${project.link})
      returning id
    `;
    const id = rows[0].id;
    await client.sql`
      insert into project_technologies (project_id, technology)
      select ${id}, jsonb_array_elements_text(${JSON.stringify(project.technologies)}::jsonb)
    `;
    return id;
  });
}

export async function updateProjectById(
  id: number,
  project: ProjectInput,
): Promise<boolean> {
  return withTransaction(async (client) => {
    const { rowCount } = await client.sql`
      update projects
      set
        title = ${project.title},
        description = ${project.description},
        type = ${project.type},
        link = ${project.link}
      where id = ${id}
    `;
    if (!rowCount) {
      return false;
    }
    await client.sql`delete from project_technologies where project_id = ${id}`;
    await client.sql`
      insert into project_technologies (project_id, technology)
      select ${id}, jsonb_array_elements_text(${JSON.stringify(project.technologies)}::jsonb)
    `;
    return true;
  });
}

export async function deleteProjectById(id: number): Promise<void> {
  await withTransaction(async (client) => {
    await client.sql`delete from project_technologies where project_id = ${id}`;
    await client.sql`delete from projects where id = ${id}`;
  });
}
