import { useEffect, useState } from "react";
import type { CountdownValues, SemanaSantaCountdownProps } from "~/types/home";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function getRemainingTime(
  targetIso: string,
  now: Date | string = new Date(),
): CountdownValues {
  const targetTime = new Date(targetIso).getTime();
  const currentTime =
    typeof now === "string" ? new Date(now).getTime() : now.getTime();

  const difference = Math.max(targetTime - currentTime, 0);

  return {
    days: Math.floor(difference / DAY),
    hours: Math.floor((difference % DAY) / HOUR),
    minutes: Math.floor((difference % HOUR) / MINUTE),
    seconds: Math.floor((difference % MINUTE) / SECOND),
  };
}

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

export function SemanaSantaCountdown({ countdown }: SemanaSantaCountdownProps) {
  const [remaining, setRemaining] = useState<CountdownValues>(() =>
    getRemainingTime(countdown.targetIso, countdown.nowIso),
  );

  useEffect(() => {
    function updateCountdown() {
      setRemaining(getRemainingTime(countdown.targetIso));
    }

    updateCountdown();

    const interval = window.setInterval(updateCountdown, SECOND);

    return () => {
      window.clearInterval(interval);
    };
  }, [countdown.targetIso]);

  const values = [
    { label: "Días", value: remaining.days },
    { label: "Horas", value: remaining.hours },
    { label: "Minutos", value: remaining.minutes },
    { label: "Segundos", value: remaining.seconds },
  ];

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-360 px-6 pt-12 pb-20 md:flex md:min-h-svh md:flex-col md:justify-center md:px-10 md:py-10 lg:px-20">
        <div className="w-full">
          {/* Contador */}
          <div>
            <h1 className="text-center font-normal tracking-[-0.03em]">
              <span className="block text-lg leading-none text-white/75 md:text-4xl">
                Esperando nuestra
              </span>

              <span className="mt-5 block text-[2.2rem] leading-[1.08] md:text-6xl md:leading-[1.02]">
                Semana Santa {countdown.targetYear}
              </span>
            </h1>

            <div className="mt-12 grid grid-cols-2 md:mt-16 md:grid-cols-4 lg:mt-16">
              {values.map((item, index) => (
                <div
                  key={item.label}
                  className={[
                    "py-8 md:py-10 lg:py-12",
                    index % 2 !== 0 ? "border-l border-white/15" : "",
                    index >= 2 ? "border-t border-white/15 md:border-t-0" : "",
                    index >= 1 ? "md:border-l md:border-white/15" : "",
                  ].join(" ")}
                >
                  <p className="text-center text-5xl font-normal tabular-nums tracking-[-0.04em] md:text-6xl lg:text-8xl">
                    {formatNumber(item.value)}
                  </p>

                  <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Glorias */}
          <div className="mt-12 border-t border-white/15 pt-10 md:mt-14 md:pt-10">
            <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-8">
              <div className="text-center md:mx-auto md:max-w-xl md:text-left">
                <p className="font-normal tracking-[-0.03em] text-white">
                  <span className="block whitespace-nowrap text-[1.85rem] leading-[1.05] md:text-6xl md:leading-[0.98]">
                    Las glorias toledanas
                  </span>

                  <span className="mt-1 block text-[1.85rem] leading-[1.05] md:mt-0 md:text-6xl md:leading-[0.98]">
                    no descansan
                  </span>
                </p>

                <p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-white/70 md:mx-0 md:mt-5 md:max-w-none md:text-lg md:leading-8">
                  Descubre las glorias de Toledo pinchando en el logo
                </p>
              </div>

              <div className="flex items-center justify-center">
                <a
                  href="https://gloriaviva.vercel.app/"
                  aria-label="Visitar Gloria Viva"
                  className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <img
                    src="logoGloria.png"
                    alt="Gloria Viva"
                    className="h-auto w-40 object-contain md:w-56 lg:w-64"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
