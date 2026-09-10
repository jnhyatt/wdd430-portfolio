export interface InterestListProps {
  interests: InterestRowProps[];
}

export function InterestList(props: InterestListProps) {
  return (
    <section className="rounded border-l-4 border-blue-600 bg-gray-800 py-2 pl-8">
      <ul className="list-disc">
        {props.interests.map((x) => (
          <InterestRow key={x.title} {...x} />
        ))}
      </ul>
    </section>
  );
}

export interface InterestRowProps {
  title: string;
  link: string;
}

export function InterestRow(props: InterestRowProps) {
  return (
    <li>
      {/* <Link  */}
      <a className="text-blue-300 hover:underline" href={props.link}>
        {props.title}
      </a>
    </li>
  );
}
