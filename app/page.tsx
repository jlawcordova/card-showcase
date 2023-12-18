import Image from "next/image";
import CardShowcase from "./components/card-showcase";
import HiRes37 from "./37_hires.png";
import Sk37 from "./37.png";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="pb-24 text-4xl font-bold">My First ex Card</h1>
      <CardShowcase>
        <Image src={HiRes37} alt="37_hires"></Image>
      </CardShowcase>
      <CardShowcase>
        <Image src={Sk37} alt="37_hires"></Image>
      </CardShowcase>
    </main>
  );
}
