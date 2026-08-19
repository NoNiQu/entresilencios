import { InformationPageLayout } from "~/components/layout/InformationPageLayout";

const questions = [
  {
    question: "¿Es una página oficial?",
    answer:
      "No. Entre Silencios no representa oficialmente a ninguna hermandad, cofradía, institución religiosa, administración pública ni entidad organizadora.",
  },
  {
    question: "¿Te han pagado?",
    answer: "NO :)",
  },
  {
    question: "¿Cuál es el objetivo del proyecto?",
    answer:
      "El proyecto ha sido desarrollado como parte de un portfolio personal de diseño y desarrollo web, pero también busca convertirse en una guía útil, clara y accesible para quienes quieran conocer la Semana Santa de Toledo.",
  },
  {
    question: "¿La información está siempre actualizada?",
    answer:
      "Se procura mantener actualizados los horarios, recorridos y demás datos. Sin embargo, pueden producirse cambios de última hora por motivos organizativos, meteorológicos o de otra naturaleza.",
  },
  {
    question: "¿Dónde debo comprobar los cambios de última hora?",
    answer:
      "Antes de asistir a una procesión debes consultar los canales oficiales de la cofradía correspondiente o de las instituciones organizadoras.",
  },
  {
    question: "¿Cómo se calculan las fechas de cada jornada?",
    answer:
      "Las fechas se calculan cada año tomando como referencia el Domingo de Resurrección y el desplazamiento correspondiente a cada jornada de la Semana Santa.",
  },
  {
    question: "¿Puedo comunicar un error?",
    answer:
      "Sí. Puedes utilizar la página de contacto para comunicar datos incorrectos, cambios de horario, enlaces que no funcionen o cualquier otra incidencia.",
  },
  {
    question: "¿Puedo enviar fotografías o información?",
    answer:
      "Puedes proponer material o información mediante el correo de contacto. Su publicación dependerá de que pueda comprobarse su procedencia, exactitud y autorización de uso.",
  },
  {
    question: "¿Entre Silencios utiliza cookies?",
    answer:
      "Actualmente la web no utiliza cookies de analítica, publicidad, personalización ni seguimiento.",
  },
] as const;

export function meta() {
  return [
    {
      title: "FAQs | Entre Silencios",
    },
    {
      name: "description",
      content:
        "Respuestas a las preguntas frecuentes sobre Entre Silencios y la información publicada.",
    },
  ];
}

export default function FaqPage() {
  return (
    <InformationPageLayout title="FAQs">
      <section aria-labelledby="about-faq">
        <div className="border-b border-black/15 pb-14 lg:pb-20">
          <h2
            id="about-faq"
            className="text-5xl font-normal text-center tracking-tight text-black lg:text-10xl"
          >
            ¿Qué es Entre Silencios?
          </h2>

          <div className="mt-15 space-y-5 text-base leading-7 text-black/75 lg:mt-15 lg:text-lg lg:leading-8">
            <p>
              Entre Silencios es una guía independiente y no oficial dedicada a
              la Semana Santa de Toledo.
            </p>

            <p>
              Entre Silencios nace como un proyecto personal con el que
              desarrollar y mostrar mis habilidades de diseño y desarrollo web
              dentro de mi portfolio. La web reúne y organiza información sobre
              cofradías, procesiones, horarios, itinerarios, sedes canónicas,
              titulares y otros elementos relacionados con la Semana Santa de
              Toledo. Y si, además, sirve de ayuda a quienes buscan consultar
              esta información de forma clara y ordenada, mucho mejor.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-label="Listado de preguntas frecuentes"
        className="pt-14 lg:pt-20"
      >
        <div className="grid items-start gap-x-8 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          {questions.map((item) => (
            <details
              key={item.question}
              className="group border-b border-black/15"
            >
              <summary className="flex min-h-24 cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-base font-medium leading-6 text-black marker:hidden">
                <span>{item.question}</span>

                <span
                  aria-hidden="true"
                  className="relative block h-5 w-5 shrink-0"
                >
                  <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-black" />

                  <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-black transition-all duration-200 group-open:rotate-90 group-open:opacity-0" />
                </span>
              </summary>

              <p className="pb-6 pr-8 text-sm leading-6 text-black/75">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </InformationPageLayout>
  );
}
