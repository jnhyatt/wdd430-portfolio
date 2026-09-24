export default function ProjectListSkeleton() {
  return (
    <section
      aria-busy="true"
      className="grid animate-pulse gap-4 md:grid-cols-2"
    >
      {Array.from({ length: 4 }, (_, i) => (
        <article
          key={i}
          className="rounded border-l-4 border-gray-700 bg-gray-800 p-4"
        >
          <div className="mb-3 h-6 w-2/3 rounded bg-gray-700" />
          <div className="mb-2 h-4 w-full rounded bg-gray-700" />
          <div className="mb-3 h-4 w-5/6 rounded bg-gray-700" />
          <div className="h-4 w-1/2 rounded bg-gray-700" />
          <div className="mt-3 h-4 w-24 rounded bg-gray-700" />
        </article>
      ))}
    </section>
  );
}
