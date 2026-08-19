import { Link } from "react-router";
import type { Route } from "./+types/cofradias";
import { InformationPageLayout } from "~/components/layout/InformationPageLayout";
import { getCofradiasPublicadas } from "~/services/cofradias.service";

export function meta() {
  return [
    {
      title: "Cofradías | Entre Silencios",
    },
    {
      name: "description",
      content:
        "Conoce las hermandades y cofradías de la Semana Santa de Toledo.",
    },
  ];
}

export async function loader() {
  const cofradias = await getCofradiasPublicadas();

  return {
    cofradias,
  };
}

export default function CofradiasPage({ loaderData }: Route.ComponentProps) {
  const { cofradias } = loaderData;

  return (
    <InformationPageLayout title="Cofradías" wide>
      {cofradias.length === 0 ? (
        <p className="text-black/75">No hay cofradías disponibles.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-3 md:gap-y-20 lg:grid-cols-4 lg:gap-x-12">
          {cofradias.map((cofradia) => (
            <Link
              key={cofradia.id}
              to={`/cofradias/${cofradia.slug}`}
              title={cofradia.nombre}
              className="group flex flex-col items-center text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              {/* Escudo */}
              <div className="flex h-40 w-full items-center justify-center md:h-44">
                {cofradia.escudo_url ? (
                  <img
                    src={`/escudos/${cofradia.escudo_url}`}
                    alt={`Escudo de ${cofradia.nombre}`}
                    className="max-h-36 max-w-28 object-contain md:max-h-40 md:max-w-32"
                  />
                ) : (
                  <div className="h-32 w-24" />
                )}
              </div>

              {/* Nombre */}
              <p className="mt-5 max-w-56 text-sm leading-6 text-black/75 transition-colors duration-200 group-hover:text-black group-focus-visible:text-black md:text-base">
                {cofradia.nombre}
              </p>
            </Link>
          ))}
        </div>
      )}
    </InformationPageLayout>
  );
}
