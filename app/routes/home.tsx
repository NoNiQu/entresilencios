import type { Route } from "./+types/home";
import { HomeHero } from "~/components/home/HomeHero";
import { SemanaSantaCountdown } from "~/components/home/SemanaSantaCountdown";
import { SemanaSantaToledo } from "~/components/home/SemanaSantaToledo";
import { getHomeCountdownData } from "~/utils/semanaSanta";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Entre Silencios",
    },
    {
      name: "description",
      content: "Guía independiente y no oficial de la Semana Santa de Toledo.",
    },
  ];
}

export async function loader() {
  return {
    countdown: getHomeCountdownData(new Date()),
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <HomeHero />

      <SemanaSantaCountdown countdown={loaderData.countdown} />

      <SemanaSantaToledo />

      <div className="bg-black text-white">
        <div className="mx-auto max-w-360 px-6 pt-16 pb-6 md:px-10 md:pt-20 md:pb-8 lg:px-30 lg:pt-24 lg:pb-10">
          <div className="border-b border-white/15 pb-16 md:pb-20 lg:pb-24">
            <p className="mx-auto max-w-4xl text-center text-[2.6rem] font-normal leading-[1.02] tracking-[-0.03em] md:text-6xl md:leading-[0.98]">
              Entre silencios y horquillas,
              <br />
              Toledo vuelve a esperar.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
