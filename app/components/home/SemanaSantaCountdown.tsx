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
    {
      label: "Días",
      value: remaining.days,
    },
    {
      label: "Horas",
      value: remaining.hours,
    },
    {
      label: "Minutos",
      value: remaining.minutes,
    },
    {
      label: "Segundos",
      value: remaining.seconds,
    },
  ];

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-360 px-6 py-25 md:px-10 md:py-25 lg:px-30 lg:py-35">
        <h1 className="text-center font-normal tracking-[-0.03em]">
          <span className="block text-lg leading-none text-white/75 md:text-4xl">
            Esperando nuestra
          </span>

          <span className="mt-5 block text-[2.2rem] leading-[1.1] md:text-6xl md:leading-[1.02]">
            Semana Santa {countdown.targetYear}
          </span>
        </h1>

        <div className="mt-16 grid grid-cols-2 md:mt-25 md:grid-cols-4">
          {values.map((item, index) => (
            <div
              key={item.label}
              className={[
                "py-8 md:py-12",
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
    </section>
  );
}
