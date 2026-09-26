import Link from "next/link";
import DeleteProjectButton from "./DeleteProjectButton";

export interface ProjectCardProps {
  // Only projects from the database can be edited or deleted.
  id?: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  technologies,
  link,
}: ProjectCardProps) {
  return (
    <article className="rounded border-l-4 border-blue-600 bg-gray-800 p-4">
      <h3 className="mb-2 text-xl font-bold text-gray-200">{title}</h3>
      <p className="mb-3 text-gray-400">{description}</p>
      <p className="text-sm text-gray-300">
        <strong>Technologies:</strong> {technologies.join(", ")}
      </p>

      <div className="mt-2 flex gap-4">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 hover:underline"
        >
          View Project
        </a>
        {id != null && (
          <>
            <Link
              href={`/projects/${id}/edit`}
              className="text-blue-300 hover:underline"
            >
              Edit
            </Link>
            <DeleteProjectButton id={id} title={title} />
          </>
        )}
      </div>
    </article>
  );
}
