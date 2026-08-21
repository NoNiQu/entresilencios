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
        <div className="-mt-8 grid grid-cols-1 pb-12 sm:mt-0 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-16 sm:pb-0 md:gap-y-20 lg:grid-cols-4 lg:gap-x-12">
          {cofradias.map((cofradia) => (
            <Link
              key={cofradia.id}
              to={`/cofradias/${cofradia.slug}`}
              title={cofradia.nombre}
              className="group grid grid-cols-[7rem_1fr] items-center gap-x-6 border-b border-black/15 py-7 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:flex sm:flex-col sm:items-center sm:border-0 sm:py-0 sm:text-center"
            >
              {/* Escudo */}
              <div className="flex h-28 w-28 items-center justify-center sm:h-40 sm:w-full md:h-44">
                {cofradia.escudo_url ? (
                  <img
                    src={`/escudos/${cofradia.escudo_url}`}
                    alt={`Escudo de ${cofradia.nombre}`}
                    className="max-h-24 max-w-24 object-contain sm:max-h-36 sm:max-w-28 md:max-h-40 md:max-w-32"
                  />
                ) : (
                  <div className="h-24 w-20 sm:h-32 sm:w-24" />
                )}
              </div>

              {/* Información */}
              <div className="flex min-h-28 w-full flex-col justify-between sm:min-h-0 sm:items-center">
                {/* Nombre */}
                <p className="mt-6 max-w-56 text-sm font-bold leading-6 text-black/75 transition-colors duration-200 group-hover:text-black group-focus-visible:text-black sm:mt-5 sm:font-normal md:text-base">
                  {cofradia.nombre_corto ?? cofradia.nombre}
                </p>

                {/* Saber más - solo móvil */}
                <span className="mr-3 mt-5 self-end text-sm text-black/65 transition-colors duration-200 group-hover:text-black group-focus-visible:text-black sm:hidden">
                  Saber más...
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </InformationPageLayout>
  );
}
