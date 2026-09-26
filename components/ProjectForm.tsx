"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { ProjectFormState } from "@/app/lib/actions";
import type { Project } from "@/lib/projects-db";

export interface ProjectFormProps {
  action: (
    prevState: ProjectFormState,
    formData: FormData,
  ) => Promise<ProjectFormState>;
  project?: Project;
  submitLabel: string;
}

const inputClass =
  "w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100 " +
  "focus:border-blue-400 focus:outline-none aria-invalid:border-red-400";

function FieldErrors({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) {
    return null;
  }
  return (
    <div id={id} aria-live="polite" className="mt-1 text-sm text-red-400">
      {errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
}

export default function ProjectForm({
  action,
  project,
  submitLabel,
}: ProjectFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const values = {
    title: state.values?.title ?? project?.title,
    description: state.values?.description ?? project?.description,
    type: state.values?.type ?? project?.type ?? "",
    link: state.values?.link ?? project?.link,
    technologies:
      state.values?.technologies ?? project?.technologies.join(", "),
  };
  const errors = state.errors ?? {};
  const errorProps = (name: keyof typeof errors) =>
    errors[name]?.length
      ? { "aria-invalid": true, "aria-describedby": `${name}-error` }
      : {};

  return (
    <form
      action={formAction}
      className="space-y-5 rounded border-l-4 border-blue-600 bg-gray-800 p-6"
    >
      <div>
        <label htmlFor="title" className="mb-1 block font-semibold">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={values.title}
          className={inputClass}
          {...errorProps("title")}
        />
        <FieldErrors id="title-error" errors={errors.title} />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block font-semibold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={values.description}
          className={inputClass}
          {...errorProps("description")}
        />
        <FieldErrors id="description-error" errors={errors.description} />
      </div>

      <div>
        <label htmlFor="type" className="mb-1 block font-semibold">
          Type
        </label>
        <select
          id="type"
          name="type"
          required
          // Keyed so a changed default (e.g. after a failed submit) is applied.
          key={values.type}
          defaultValue={values.type}
          className={inputClass}
          {...errorProps("type")}
        >
          <option value="" disabled>
            Select a type
          </option>
          <option value="school">School</option>
          <option value="opensource">Open Source</option>
        </select>
        <FieldErrors id="type-error" errors={errors.type} />
      </div>

      <div>
        <label htmlFor="link" className="mb-1 block font-semibold">
          Link
        </label>
        <input
          id="link"
          name="link"
          type="url"
          required
          placeholder="https://"
          defaultValue={values.link}
          className={inputClass}
          {...errorProps("link")}
        />
        <FieldErrors id="link-error" errors={errors.link} />
      </div>

      <div>
        <label htmlFor="technologies" className="mb-1 block font-semibold">
          Technologies <span className="text-gray-400">(comma-separated)</span>
        </label>
        <input
          id="technologies"
          name="technologies"
          required
          defaultValue={values.technologies}
          className={inputClass}
          {...errorProps("technologies")}
        />
        <FieldErrors id="technologies-error" errors={errors.technologies} />
      </div>

      {state.message && (
        <p aria-live="polite" className="text-red-400">
          {state.message}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <Link
          href="/projects"
          className="rounded px-4 py-2 text-gray-300 transition-colors hover:text-blue-400"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
        >
          {pending ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
