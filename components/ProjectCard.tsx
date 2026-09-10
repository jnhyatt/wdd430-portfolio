export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({
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
      {link && (
        <p className="mt-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:underline"
          >
            View Project
          </a>
        </p>
      )}
    </article>
  );
}
