import { Link } from "react-router";

export function SemanaSantaToledo() {
  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-360 px-6 py-24 md:px-10 md:py-28 lg:px-10 lg:pt-28 lg:pb-18">
        {/* Introducción */}
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-10">
          <div>
            <h2 className="max-w-4xl text-[2.6rem] font-normal leading-[1.02] tracking-[-0.03em] md:text-6xl md:leading-[0.98]">
              Cuando la ciudad
              <br />
              guarda silencio.
            </h2>
          </div>

          <div className="max-w-xl self-end">
            <div className="space-y-5 text-base leading-7 text-black/75 md:text-lg md:leading-8">
              <p>
                La Semana Santa de Toledo transforma el casco histórico en un
                escenario único. Sus procesiones avanzan entre calles estrechas,
                plazas, cuestas y templos, mientras el silencio de la noche se
                rompe con el sonido de las horquillas sobre el empedrado.
              </p>

              <p>
                Entre luces, sombras y siglos de historia, cada cofradía recorre
                una ciudad que parece detenerse a su paso. Una forma distinta de
                descubrir Toledo y de vivir una Semana Santa marcada por la
                cercanía, el recogimiento y el silencio.
              </p>
            </div>
          </div>
        </div>

        {/* Explorar */}
        <div className="mt-20 grid gap-16 md:mt-24 md:grid-cols-3 md:gap-3 lg:mt-28">
          <Link
            to="/cofradias"
            className="group relative flex min-h-92 flex-col overflow-hidden rounded-2xl p-9 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:min-h-80 md:p-9 lg:px-8 lg:py-12"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom-right scale-0 bg-black transition-transform duration-450ms ease-out group-hover:scale-100 group-focus-visible:scale-100"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 z-20 h-px w-[70%] -translate-x-1/2 bg-black/15 transition-colors duration-500 group-hover:bg-white/15 group-focus-visible:bg-white/15 md:bottom-auto md:left-auto md:right-0 md:top-1/2 md:h-[70%] md:w-px md:translate-x-0 md:-translate-y-1/2"
            />

            <h2 className="relative z-10 text-4xl font-normal leading-none tracking-[-0.03em] transition-colors duration-500 group-hover:text-white group-focus-visible:text-white md:text-5xl xl:whitespace-nowrap">
              Cofradías
            </h2>

            <p className="relative z-10 mt-10 text-base leading-7 text-black/75 transition-colors duration-500 group-hover:text-white/75 group-focus-visible:text-white/75 md:mt-8">
              Conoce las hermandades y cofradías de la Semana Santa de Toledo,
              sus titulares, historia y principales datos.
            </p>

            <div className="relative z-10 mt-auto self-end pt-14 text-right text-sm font-medium transition-colors duration-500 group-hover:text-white group-focus-visible:text-white md:pt-10">
              Explorar cofradías
            </div>
          </Link>

          <Link
            to="/procesiones"
            className="group relative flex min-h-92 flex-col overflow-hidden rounded-2xl p-9 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:min-h-80 md:p-9 lg:px-8 lg:py-12"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom-right scale-0 bg-black transition-transform duration-450ms ease-out group-hover:scale-100 group-focus-visible:scale-100"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 z-20 h-px w-[70%] -translate-x-1/2 bg-black/15 transition-colors duration-500 group-hover:bg-white/15 group-focus-visible:bg-white/15 md:bottom-auto md:left-auto md:right-0 md:top-1/2 md:h-[70%] md:w-px md:translate-x-0 md:-translate-y-1/2"
            />

            <h2 className="relative z-10 text-4xl font-normal leading-none tracking-[-0.03em] transition-colors duration-500 group-hover:text-white group-focus-visible:text-white md:text-5xl xl:whitespace-nowrap">
              Procesiones
            </h2>

            <p className="relative z-10 mt-10 text-base leading-7 text-black/75 transition-colors duration-500 group-hover:text-white/75 group-focus-visible:text-white/75 md:mt-8">
              Consulta las procesiones de cada jornada, sus horarios,
              itinerarios y principales puntos de interés.
            </p>

            <div className="relative z-10 mt-auto self-end pt-14 text-right text-sm font-medium transition-colors duration-500 group-hover:text-white group-focus-visible:text-white md:pt-10">
              Ver procesiones
            </div>
          </Link>

          <Link
            to="/sedescanonicas"
            className="group relative flex min-h-92 flex-col overflow-hidden rounded-2xl p-9 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:min-h-80 md:p-9 lg:px-8 lg:py-12"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom-right scale-0 bg-black transition-transform duration-450ms ease-out group-hover:scale-100 group-focus-visible:scale-100"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 z-20 h-px w-[70%] -translate-x-1/2 bg-black/15 transition-colors duration-500 group-hover:bg-white/15 group-focus-visible:bg-white/15 md:bottom-auto md:left-auto md:right-0 md:top-1/2 md:h-[70%] md:w-px md:translate-x-0 md:-translate-y-1/2"
            />

            <h2 className="relative z-10 text-4xl font-normal leading-none tracking-[-0.03em] transition-colors duration-500 group-hover:text-white group-focus-visible:text-white md:text-5xl xl:whitespace-nowrap">
              Sedes canónicas
            </h2>

            <p className="relative z-10 mt-10 text-base leading-7 text-black/75 transition-colors duration-500 group-hover:text-white/75 group-focus-visible:text-white/75 md:mt-8">
              Descubre los templos vinculados a las cofradías y conoce los
              lugares desde los que parte buena parte de la Semana Santa
              toledana.
            </p>

            <div className="relative z-10 mt-auto self-end pt-14 text-right text-sm font-medium transition-colors duration-500 group-hover:text-white group-focus-visible:text-white md:pt-10">
              Ver sedes canónicas
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
