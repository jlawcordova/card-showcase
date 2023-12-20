import Image from "next/image";
import ShinyCard from "./lib/shiny-card/shiny-card";
import HiRes37 from "./assets/cards/37_hires.png";
import Trainer from "./assets/trainers/ce0d65ed-e4e6-4f9b-9f5e-cfe5163353da.png";

export default function Home() {
  return (
    <main
      className="flex flex-col h-screen items-center p-24"
      style={{ backgroundImage: "url('/backgrounds/grey-pattern.png')" }}
    >
      <div className="mb-16 flex gap-8">
        <ShinyCard rotationMaxStrength={12}>
          <Image src={Trainer} alt="Jello Cornetto Trainer Card"></Image>
        </ShinyCard>
        <table className="table">
          <tbody className="table-row-group">
            <tr className="table-row rounded-sm">
              <td className="table-cell pr-4 text-2xl px-4 bg-white">Name</td>
              <td className="table-cell text-2xl text-right px-4 bg-white">
                Jello Cornetto
              </td>
            </tr>
            <tr className="table-row rounded-lg">
              <td className="table-cell pr-4 text-2xl px-4 bg-white">
                Pokédex
              </td>
              <td className="table-cell text-2xl text-right px-4 bg-white">
                73
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ShinyCard>
        <Image src={HiRes37} alt="37_hires"></Image>
      </ShinyCard>
    </main>
  );
}
