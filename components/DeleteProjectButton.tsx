"use client";

import { useActionState } from "react";
import { deleteProject } from "@/app/lib/actions";

export default function DeleteProjectButton({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  const [state, formAction, pending] = useActionState(
    () => deleteProject(id),
    {},
  );

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!confirm(`Delete "${title}"? This can't be undone.`)) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        disabled={pending}
        className="text-red-400 hover:underline disabled:opacity-50"
      >
        {pending ? "Deleting…" : "Delete"}
      </button>
      {state.message && (
        <p aria-live="polite" className="text-sm text-red-400">
          {state.message}
        </p>
      )}
    </form>
  );
}
