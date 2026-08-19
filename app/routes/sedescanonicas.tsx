import { Link } from "react-router";
import type { Route } from "./+types/sedescanonicas";
import { InformationPageLayout } from "~/components/layout/InformationPageLayout";
import { getSedesCanonicasPublicadas } from "~/services/sedescanonicas.service";

export function meta() {
  return [
    {
      title: "Sedes canónicas | Entre Silencios",
    },
    {
      name: "description",
      content:
        "Descubre las sedes canónicas de las cofradías de la Semana Santa de Toledo.",
    },
  ];
}

export async function loader() {
  const sedes = await getSedesCanonicasPublicadas();

  return {
    sedes,
  };
}

export default function SedesCanonicasPage({
  loaderData,
}: Route.ComponentProps) {
  const { sedes } = loaderData;

  return (
    <InformationPageLayout title="Sedes canónicas" wide>
      {sedes.length === 0 ? (
        <p className="text-black/75">No hay sedes canónicas disponibles.</p>
      ) : (
        <div>
          {sedes.map((sede) => (
            <Link
              key={sede.id}
              to={`/sedescanonicas/${sede.slug}`}
              className="group block w-full border-b border-black/15 px-0 py-10 transition-all duration-500 hover:rounded-2xl hover:border-transparent hover:bg-black hover:text-white focus-visible:rounded-2xl focus-visible:border-transparent focus-visible:bg-black focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:py-12"
            >
              <div className="px-5 md:px-8 lg:px-10">
                <h2 className="text-2xl font-normal leading-tight tracking-[-0.03em] md:text-3xl">
                  {sede.nombre}
                </h2>

                <p className="mt-4 text-sm leading-6 text-black/75 transition-colors duration-500 group-hover:text-white/75 group-focus-visible:text-white/75 md:text-base">
                  {sede.direccion}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </InformationPageLayout>
  );
}
