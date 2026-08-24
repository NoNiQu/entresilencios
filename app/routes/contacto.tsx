import { Link } from "react-router";
import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";
import { CopyEmailButton } from "~/components/CopyEmailButton";

export function meta() {
  return [
    {
      title: "Contacto | Entre Silencios",
    },
    {
      name: "description",
      content:
        "Contacta con Entre Silencios para comunicar correcciones, propuestas o cuestiones relacionadas con el proyecto.",
    },
  ];
}

export default function ContactoPage() {
  return (
    <>
      <main className="relative min-h-screen bg-black text-white">
        <div className="mx-auto flex min-h-screen max-w-360 flex-col justify-start px-5 pb-20 pt-32 sm:px-6 md:px-10 md:pb-20 md:pt-40 lg:justify-center lg:px-30">
          <div className="grid w-full gap-16 md:gap-16 lg:grid-cols-2 lg:items-stretch">
            {/* Columna izquierda */}
            <section className="mt-9 flex max-w-xl flex-col md:mt-0">
              <h1 className="text-5xl font-normal leading-none tracking-[-0.03em] md:text-7xl">
                Contacto
              </h1>

              <p className="mt-7 max-w-lg text-[15px] leading-6 text-white/75 md:mt-8 md:text-lg md:leading-8">
                Entre Silencios es una guía independiente y no oficial de la
                Semana Santa de Toledo, creada para consultar cofradías,
                procesiones, horarios e itinerarios.
              </p>

              <Link
                to="/faq"
                className="mt-7 inline-flex w-fit items-center gap-3 text-sm font-medium text-white/75 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:mt-8"
              >
                Preguntas frecuentes
                <span aria-hidden="true">→</span>
              </Link>

              <div className="mt-8 border-t border-white/15 pt-7 md:mt-10 md:pt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
                  Puedes escribir para
                </p>

                <ul className="mt-6 space-y-4 text-sm leading-6 text-white/75">
                  <li className="flex gap-4">
                    <span aria-hidden="true" className="text-white/75">
                      —
                    </span>
                    <span>
                      Comunicar información incorrecta o desactualizada.
                    </span>
                  </li>

                  <li className="flex gap-4">
                    <span aria-hidden="true" className="text-white/75">
                      —
                    </span>
                    <span>
                      Proponer información, fotografías o colaboraciones.
                    </span>
                  </li>

                  <li className="flex gap-4">
                    <span aria-hidden="true" className="text-white/75">
                      —
                    </span>
                    <span>
                      Solicitar la corrección o retirada de contenidos.
                    </span>
                  </li>

                  <li className="flex gap-4">
                    <span aria-hidden="true" className="text-white/75">
                      —
                    </span>
                    <span>
                      Consultar cuestiones sobre el diseño y desarrollo del
                      proyecto.
                    </span>
                  </li>

                  <li className="flex gap-4">
                    <span aria-hidden="true" className="text-white/75">
                      —
                    </span>
                    <span>
                      Cualquier otra cuestión relacionada con el proyecto que
                      quieras comunicar.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Tarjeta derecha */}
            <section className="h-full w-full bg-white px-6 py-8 text-black sm:p-8 md:p-12 lg:p-14">
              <h2 className="text-5xl font-normal leading-none tracking-[-0.03em] md:text-6xl">
                ¿Hablamos?
              </h2>

              <p className="mt-6 text-base leading-7 text-black/75 md:mt-8">
                Estoy abierto a correcciones, propuestas y colaboraciones que
                ayuden a mejorar la guía y mantener su información útil y
                actualizada.
              </p>

              <div className="mt-8 md:mt-8">
                <CopyEmailButton />
              </div>

              <div className="mt-8 border-t border-black/15 pt-7 md:mt-8">
                <p className="text-sm leading-6 text-black/75">
                  Entre Silencios no es un canal oficial de las cofradías ni de
                  ninguna institución.
                </p>

                <p className="mt-4 text-sm leading-6 text-black/75">
                  Para confirmar horarios, suspensiones o cambios de última
                  hora, consulta siempre los canales oficiales.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
