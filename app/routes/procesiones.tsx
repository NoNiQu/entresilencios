import { Link } from "react-router";
import type { Route } from "./+types/procesiones";
import { InformationPageLayout } from "~/components/layout/InformationPageLayout";
import { getProcesionesPublicadas } from "~/services/procesiones.service";

export function meta() {
  return [
    {
      title: "Procesiones | Entre Silencios",
    },
    {
      name: "description",
      content: "Consulta las procesiones de la Semana Santa de Toledo.",
    },
  ];
}

export async function loader() {
  const procesiones = await getProcesionesPublicadas();

  return {
    procesiones,
  };
}

function formatHora(hora: string | null) {
  if (!hora) {
    return "Por confirmar";
  }

  return `${hora.slice(0, 5)} h`;
}

export default function ProcesionesPage({ loaderData }: Route.ComponentProps) {
  const { procesiones } = loaderData;

  const dias = procesiones.reduce<
    Array<{
      id: number;
      nombre: string;
      procesiones: typeof procesiones;
    }>
  >((grupos, procesion) => {
    if (!procesion.dia) {
      return grupos;
    }

    const grupo = grupos.find((item) => item.id === procesion.dia?.id);

    if (grupo) {
      grupo.procesiones.push(procesion);
      return grupos;
    }

    grupos.push({
      id: procesion.dia.id,
      nombre: procesion.dia.nombre,
      procesiones: [procesion],
    });

    return grupos;
  }, []);

  return (
    <InformationPageLayout title="Procesiones" wide>
      {dias.length === 0 ? (
        <p className="text-black/75">No hay procesiones disponibles.</p>
      ) : (
        <div className="space-y-20 md:space-y-24">
          {dias.map((dia) => (
            <section key={dia.id}>
              <h2 className="text-center text-4xl font-normal leading-none tracking-[-0.03em] md:text-5xl">
                {dia.nombre}
              </h2>

              {/* Procesiones */}
              <div className="mt-12">
                {dia.procesiones.map((procesion) => (
                  <Link
                    key={procesion.id}
                    to={`/procesiones/${procesion.slug}`}
                    className="group block w-full border-b border-black/15 py-10 transition-all duration-500 hover:rounded-2xl hover:border-transparent hover:bg-black hover:text-white focus-visible:rounded-2xl focus-visible:border-transparent focus-visible:bg-black focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:py-12"
                  >
                    <div className="px-5 md:px-8 lg:px-10">
                      {/* Nombre */}
                      <h3 className="max-w-5xl text-2xl font-normal leading-tight tracking-[-0.03em] md:text-3xl">
                        {procesion.nombre}
                      </h3>

                      {/* Lugar + hora */}
                      <div className="mt-5 flex flex-col gap-3 text-sm leading-6 text-black/75 transition-colors duration-500 group-hover:text-white/75 group-focus-visible:text-white/75 md:flex-row md:items-center md:justify-between md:text-base">
                        <p>
                          {procesion.lugar_salida ??
                            "Lugar de salida por confirmar"}
                        </p>

                        <p className="shrink-0 tabular-nums">
                          {formatHora(procesion.hora_salida)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </InformationPageLayout>
  );
}
