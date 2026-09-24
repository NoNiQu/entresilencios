import { Link } from "react-router";

export function Agradecimientos() {
  return (
    <section
      aria-labelledby="agradecimientos-title"
      className="bg-black text-white"
    >
      <div className="mx-auto max-w-360 px-6 py-14 md:px-10 md:py-20 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:px-20 lg:py-16">
        {/* Agradecimientos */}
        <div className="mx-auto w-full max-w-5xl text-center">
          <h2
            id="agradecimientos-title"
            className="text-[2.6rem] font-normal leading-[1.02] tracking-[-0.03em] md:text-6xl md:leading-[0.98]"
          >
            Agradecimientos
          </h2>

          <div className="mx-auto mt-8 max-w-4xl space-y-4 text-[0.95rem] leading-7 text-white/75 md:mt-10 md:text-base md:leading-7">
            <p>
              Entre Silencios empezó como una idea pequeña y ha ido creciendo
              gracias también a todas las personas que se han detenido a
              probarla, recorrer sus páginas y compartir conmigo sus
              impresiones.
            </p>

            <p>
              Gracias a quienes habéis señalado errores, propuesto mejoras y
              dedicado vuestro tiempo a ayudarme a hacer de esta web un lugar
              cada vez más cuidado y útil para conocer la Semana Santa de
              Toledo.
            </p>

            <p>
              Y, especialmente, gracias a quienes me animaron a seguir adelante
              cuando esto todavía era solo una idea y confiaron en el proyecto
              desde el principio.
            </p>

            <p className="pt-1 text-white">
              Entre Silencios también tiene un poco de vosotros.
            </p>
          </div>
        </div>

        {/* Ayuda y enlaces */}
        <div className="mt-16 md:mt-20 lg:mt-24">
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-[1.15fr_0.85fr] md:gap-8">
            {/* Texto */}
            <div className="flex min-h-64 flex-col justify-center px-2 py-7 md:min-h-72 md:px-4 md:py-9 lg:px-6">
              <h3 className="text-3xl font-normal leading-[1.05] tracking-[-0.03em] md:text-5xl">
                ¿Tienes alguna duda?
              </h3>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/75 md:text-[1.05rem] md:leading-8">
                Si has encontrado algún error, quieres aportar información o
                necesitas resolver alguna duda sobre Entre Silencios, estaré
                encantado de leerte.
              </p>

              <p className="mt-4 max-w-xl text-base leading-7 text-white/75 md:text-[1.05rem] md:leading-8">
                También puedes consultar las preguntas frecuentes por si la
                respuesta que buscas ya está allí.
              </p>
            </div>

            {/* Botones */}
            <div className="grid content-center gap-5 md:gap-10">
              <Link
                to="/contacto"
                className="flex min-h-22 items-center justify-center rounded-2xl border border-white bg-white px-5 py-5 text-center text-xl font-normal leading-tight tracking-[-0.03em] text-black transition-colors duration-300 hover:border-white/75 hover:bg-white/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:min-h-24 md:px-6 md:py-6 md:text-2xl lg:text-3xl"
              >
                Contacto
              </Link>

              <Link
                to="/faq"
                className="flex min-h-22 items-center justify-center rounded-2xl border border-white bg-white px-5 py-5 text-center text-xl font-normal leading-tight tracking-[-0.03em] text-black transition-colors duration-300 hover:border-white/75 hover:bg-white/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:min-h-24 md:px-6 md:py-6 md:text-2xl lg:text-3xl"
              >
                <span className="max-w-full whitespace-normal wrap-break-word">
                  Preguntas frecuentes
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
