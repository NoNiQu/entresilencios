import { Link } from "react-router";
import type { Route } from "./+types/procesiones.$slug";
import { PageTitleHeader } from "~/components/layout/PageTitleHeader";
import { getProcesionPorSlug } from "~/services/procesiones.service";

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;

  if (!slug) {
    throw new Response("Procesión no encontrada", {
      status: 404,
    });
  }

  const procesion = await getProcesionPorSlug(slug);

  if (!procesion) {
    throw new Response("Procesión no encontrada", {
      status: 404,
    });
  }

  return {
    procesion,
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData?.procesion) {
    return [
      {
        title: "Procesión no encontrada | Entre Silencios",
      },
    ];
  }

  return [
    {
      title: `${loaderData.procesion.nombre} | Entre Silencios`,
    },
    {
      name: "description",
      content: `Información sobre ${loaderData.procesion.nombre}, procesión de la Semana Santa de Toledo.`,
    },
  ];
}

function formatHora(hora: string | null) {
  if (!hora) {
    return "Por confirmar";
  }

  return `${hora.slice(0, 5)} h`;
}

function formatTipoPunto(tipo: string) {
  switch (tipo) {
    case "SALIDA":
      return "Salida";

    case "PUNTO_DESTACADO":
      return "Punto destacado";

    case "MOMENTO_ESPECIAL":
      return "Momento especial";

    default:
      return tipo
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/^./, (letra) => letra.toUpperCase());
  }
}

export default function ProcesionPage({ loaderData }: Route.ComponentProps) {
  const { procesion } = loaderData;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* H1 · Día */}
      <PageTitleHeader title={procesion.dia?.nombre ?? "Por confirmar"} />

      {/* Información */}
      <div className="mx-auto mt-6 max-w-360 px-6 pb-10 md:mt-8 md:px-10 md:pb-14 lg:mt-10 lg:px-30 lg:pb-27">
        {/* Cofradía */}
        <section className="border-t border-white/15 pt-10 pb-4 md:pt-12 md:pb-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
            Cofradía
          </h2>

          <Link
            to={`/cofradias/${procesion.cofradia.slug}`}
            className="mt-5 inline-flex items-center gap-5 transition-opacity duration-300 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {procesion.cofradia.escudo_url && (
              <img
                src={`/escudos/${procesion.cofradia.escudo_url}`}
                alt=""
                className="h-16 w-14 object-contain md:h-20 md:w-16"
              />
            )}

            <span className="text-xl md:text-2xl">
              {procesion.cofradia.nombre}
            </span>
          </Link>
        </section>

        {/* Horarios + recorrido */}
        <div className="grid md:grid-cols-[0.35fr_0.65fr]">
          {/* Horarios */}
          <section className="relative border-b border-white/15 pt-6 pb-10 md:border-b-0 md:pr-12 lg:pt-8 lg:pb-12 lg:after:absolute lg:after:bottom-8 lg:after:right-0 lg:after:top-8 lg:after:w-px lg:after:bg-white/15">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
              Horarios
            </h2>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-white/75">Salida</p>

                <p className="mt-1 text-xl tabular-nums md:text-2xl">
                  {formatHora(procesion.hora_salida)}
                </p>
              </div>

              <div>
                <p className="text-sm text-white/75">Entrada</p>

                <p className="mt-1 text-xl tabular-nums md:text-2xl">
                  {formatHora(procesion.hora_entrada)}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-sm text-white/75">Tiempos aproximados</p>
              </div>
            </div>
          </section>

          {/* Recorrido */}
          <section className="pt-6 pb-10 md:pl-12 lg:pt-8 lg:pb-12">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
              Recorrido
            </h2>

            {procesion.recorrido ? (
              <p className="mt-6 max-w-4xl text-sm leading-7 text-white/75 md:text-base md:leading-8">
                {procesion.recorrido}
              </p>
            ) : (
              <p className="mt-6 text-sm leading-7 text-white/75">
                Recorrido por confirmar.
              </p>
            )}
          </section>
        </div>

        {/* Puntos de interés */}
        {procesion.puntos_interes.length > 0 && (
          <section className="border-t border-white/15 py-10 md:py-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
              Puntos de interés
            </h2>

            <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {procesion.puntos_interes.map((punto, index) => (
                <article
                  key={punto.id}
                  className="flex flex-col items-center justify-center rounded-lg p-7"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs tabular-nums text-white/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                      {formatTipoPunto(punto.tipo)}
                    </p>
                  </div>

                  <h3 className="mt-4 max-w-sm text-xl font-normal leading-tight tracking-[-0.02em] md:text-2xl">
                    {punto.nombre}
                  </h3>

                  {punto.direccion && (
                    <p className="mt-4 text-sm leading-6 text-white/75">
                      {punto.direccion}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Mapa + hábitos */}
        <div className="border-t border-white/15 pt-10 md:pt-12">
          <div
            className={
              procesion.habitos.length > 0
                ? "grid gap-12 lg:grid-cols-[0.6fr_0.4fr] lg:gap-12"
                : ""
            }
          >
            {/* Mapa */}
            <section>
              <h2 className="text-2xl font-normal leading-tight tracking-[-0.03em] md:text-3xl">
                Mapa del recorrido
              </h2>

              <div className="mt-7 flex min-h-64 items-center justify-center overflow-hidden rounded-2xl md:min-h-96">
                <img
                  src={`/mapas/${procesion.image_url}.webp`}
                  alt={`Mapa de recorrido de ${procesion.nombre}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </section>

            {/* Hábitos */}
            {procesion.habitos.length > 0 && (
              <section>
                <h2 className="text-2xl font-normal leading-tight tracking-[-0.03em] md:text-3xl">
                  {procesion.habitos.length === 1 ? "Hábito" : "Hábitos"}
                </h2>

                <div className="mt-7 border-t border-white/15">
                  {procesion.habitos.map((habito) => {
                    const tieneVariosHabitos = procesion.habitos.length > 1;

                    return (
                      <article
                        key={habito.id}
                        className="border-b border-white/15 py-7 first:pt-7"
                      >
                        {tieneVariosHabitos && habito.nombre && (
                          <h3 className="text-xl font-normal leading-tight tracking-[-0.02em] md:text-2xl">
                            {habito.nombre}
                          </h3>
                        )}

                        <p
                          className={`text-sm leading-7 text-white/75 md:text-base md:leading-8 ${
                            tieneVariosHabitos && habito.nombre ? "mt-4" : ""
                          }`}
                        >
                          {habito.descripcion}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Aviso */}
        <aside className="mt-12 flex flex-col items-center border-t border-white/15 pt-8">
          <p className="max-w-4xl text-center text-sm leading-6 text-white/60">
            Los horarios, recorridos y demás información pueden sufrir
            modificaciones de última hora.
            <br />
            En caso de cancelación, retrasos o cambios por causas meteorológicas
            u otras circunstancias, consulta fuentes oficiales.
          </p>
        </aside>

        {/* Volver */}
        <div className="mt-12 border-t border-white/15 pt-6">
          <Link
            to="/procesiones"
            className="inline-flex items-center gap-3 text-sm font-medium text-white/75 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span aria-hidden="true">←</span>
            Volver a procesiones
          </Link>
        </div>
      </div>
    </main>
  );
}
