import { InterestList, InterestRowProps } from "@/components/Interest";

const interests: InterestRowProps[] = [
  {
    title: "Rust Programming Language",
    link: "https://rust-lang.org/",
  },
  {
    title: "Deep Learning",
    link: "http://neuralnetworksanddeeplearning.com",
  },
  {
    title: "Graphics Programming",
    link: "https://learnopengl.com/",
  },
];

export default function About() {
  return (
    <main className="container mx-auto w-200">
      <h2 className="pb-4 text-3xl">About</h2>
      <h3 className="pb-1 text-xl">Things that interest me</h3>
      <InterestList interests={interests} />
    </main>
  );
}
