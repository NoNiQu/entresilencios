import { Link } from "react-router";
import type { Route } from "./+types/sedescanonicas.$slug";
import { PageTitleHeader } from "~/components/layout/PageTitleHeader";
import { getSedeCanonicaPorSlug } from "~/services/sedescanonicas.service";

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;

  if (!slug) {
    throw new Response("Sede canónica no encontrada", {
      status: 404,
    });
  }

  const sede = await getSedeCanonicaPorSlug(slug);

  if (!sede) {
    throw new Response("Sede canónica no encontrada", {
      status: 404,
    });
  }

  return {
    sede,
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData?.sede) {
    return [
      {
        title: "Sede canónica no encontrada | Entre Silencios",
      },
    ];
  }

  return [
    {
      title: `${loaderData.sede.nombre} | Entre Silencios`,
    },
    {
      name: "description",
      content: `Información sobre ${loaderData.sede.nombre}, sede canónica de la Semana Santa de Toledo.`,
    },
  ];
}

function getTituloHorarios(usoActual: string | null) {
  switch (usoActual) {
    case "CULTO":
      return "Horario de misa";

    case "MUSEO":
      return "Horario de visita";

    case "CULTO_Y_MUSEO":
      return "Horarios";

    default:
      return "Horarios";
  }
}

export default function SedeCanonicaPage({ loaderData }: Route.ComponentProps) {
  const { sede } = loaderData;

  return (
    <main className="min-h-svh bg-black text-white">
      {/* Nombre + ubicación */}
      <PageTitleHeader title={sede.nombre}>
        <p className="mt-6 text-sm leading-6 text-white/75 md:text-base">
          {sede.direccion}
        </p>
      </PageTitleHeader>

      <div className="mx-auto mt-6 max-w-360 px-6 pb-10 md:mt-8 md:px-10 md:pb-14 lg:mt-10 lg:px-30 lg:pb-27">
        {/* Descripción + horario */}
        <div className="grid border-y border-white/15 lg:mt-4 lg:grid-cols-2">
          {/* Descripción */}
          <section className="relative min-h-64 border-b border-white/15 py-10 lg:min-h-72 lg:border-b-0 lg:pr-16 lg:after:absolute lg:after:bottom-8 lg:after:right-0 lg:after:top-8 lg:after:w-px lg:after:bg-white/15">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
              Descripción
            </h2>

            {sede.descripcion_breve ? (
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 md:text-base md:leading-8">
                {sede.descripcion_breve}
              </p>
            ) : (
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75">
                Actualmente no hay una descripción disponible de esta sede
                canónica.
              </p>
            )}
          </section>

          {/* Horarios */}
          <section className="min-h-64 py-10 lg:min-h-72 lg:pl-16">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
              {getTituloHorarios(sede.uso_actual)}
            </h2>

            {sede.horarios.length > 0 ? (
              <div className="mt-6 space-y-7">
                {sede.horarios.map((horario) => (
                  <div key={horario.id}>
                    <p className="text-sm leading-6 text-white/75">
                      {horario.texto}
                    </p>

                    <p className="mt-2 text-xl tabular-nums md:text-2xl">
                      {horario.hora}
                    </p>
                  </div>
                ))}
              </div>
            ) : !sede.horarios_url ? (
              <p className="mt-6 text-sm leading-7 text-white/75">
                Actualmente no hay horarios disponibles.
              </p>
            ) : null}

            {sede.horarios_url && (
              <a
                href={sede.horarios_url}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white/75 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Consultar horarios actualizados
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </section>
        </div>

        {/* Cofradías */}
        <section className="border-b border-white/15 py-10 md:py-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
            Cofradías con sede canónica aquí
          </h2>

          {sede.cofradias.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-8">
              {sede.cofradias.map((cofradia) => (
                <li key={cofradia.id}>
                  <Link
                    to={`/cofradias/${cofradia.slug}`}
                    title={cofradia.nombre}
                    className="group flex w-24 flex-col items-center text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    <span className="sr-only">{cofradia.nombre}</span>

                    {cofradia.escudo_url && (
                      <div className="flex h-20 items-center justify-center">
                        <img
                          src={`/escudos/${cofradia.escudo_url}`}
                          alt=""
                          className="max-h-18 max-w-16 object-contain"
                        />
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-sm leading-7 text-white/75">
              Actualmente no hay cofradías vinculadas a esta sede canónica.
            </p>
          )}
        </section>

        {/* Volver */}
        <div className="mt-6">
          <Link
            to="/sedescanonicas"
            className="inline-flex items-center gap-3 text-sm font-medium text-white/75 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span aria-hidden="true">←</span>
            Volver a sedes canónicas
          </Link>
        </div>
      </div>
    </main>
  );
}
