"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import {
  deleteProjectById,
  insertProject,
  updateProjectById,
  type ProjectInput,
} from "@/lib/projects-db";

const ProjectFormSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters."),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters."),
  type: z.enum(["school", "opensource"], "Choose a project type."),
  link: z.url("Enter a valid URL."),
  technologies: z
    .string()
    .transform((value) =>
      [
        ...new Set(
          value
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        ),
      ].sort(),
    )
    .pipe(z.array(z.string()).min(1, "List at least one technology.")),
});

type ProjectFormFields = keyof ProjectInput;

export type ProjectFormState = {
  errors?: Partial<Record<ProjectFormFields, string[]>>;
  message?: string;
  // Echoed back so the form can repopulate after React resets it.
  values?: Partial<Record<ProjectFormFields, string>>;
};

function readProjectForm(formData: FormData) {
  const field = (name: ProjectFormFields) => {
    const value = formData.get(name);
    return typeof value === "string" ? value : undefined;
  };
  return {
    title: field("title"),
    description: field("description"),
    type: field("type"),
    link: field("link"),
    technologies: field("technologies"),
  };
}

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const values = readProjectForm(formData);
  const parsed = ProjectFormSchema.safeParse(values);
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  try {
    await insertProject(parsed.data);
  } catch (error) {
    console.error(error);
    return { message: "Database error: failed to create project.", values };
  }

  revalidatePath("/projects", "layout");
  redirect("/projects");
}

export async function updateProject(
  id: number,
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const values = readProjectForm(formData);
  const parsed = ProjectFormSchema.safeParse(values);
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  let found: boolean;
  try {
    found = await updateProjectById(id, parsed.data);
  } catch (error) {
    console.error(error);
    return { message: "Database error: failed to update project.", values };
  }
  if (!found) {
    notFound();
  }

  revalidatePath("/projects", "layout");
  redirect("/projects");
}

export type DeleteProjectState = { message?: string };

export async function deleteProject(id: number): Promise<DeleteProjectState> {
  try {
    await deleteProjectById(id);
  } catch (error) {
    console.error(error);
    return { message: "Database error: failed to delete project." };
  }

  revalidatePath("/projects", "layout");
  return {};
}
