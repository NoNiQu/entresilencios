import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/cofradias.$slug";
import { getCofradiaPorSlug } from "~/services/cofradias.service";
import { CofradiaHero } from "~/components/CofradiaHero";

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;

  if (!slug) {
    throw new Response("Cofradía no encontrada", {
      status: 404,
    });
  }

  const cofradia = await getCofradiaPorSlug(slug);

  if (!cofradia) {
    throw new Response("Cofradía no encontrada", {
      status: 404,
    });
  }

  return {
    cofradia,
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData?.cofradia) {
    return [
      {
        title: "Cofradía no encontrada | Entre Silencios",
      },
    ];
  }

  return [
    {
      title: `${loaderData.cofradia.nombre} | Entre Silencios`,
    },
    {
      name: "description",
      content: `Información sobre ${loaderData.cofradia.nombre}, cofradía de la Semana Santa de Toledo.`,
    },
  ];
}

function getImagenesTitular(
  imagenUrl: string | null,
  advocacion: string | null,
) {
  if (!imagenUrl || !advocacion) {
    return [];
  }

  return Array.from(
    { length: 4 },
    (_, index) => `/${imagenUrl}/${advocacion}${index + 1}.webp`,
  );
}

function formatTipoPaso(tipo: string) {
  if (tipo === "DOS_HOMBROS") {
    return "A dos hombros";
  }

  return tipo
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/^./, (letra) => letra.toUpperCase());
}

function getSocialLabel(tipo: string) {
  const social = tipo.toLowerCase();

  if (social.includes("instagram")) return "Instagram";
  if (social.includes("facebook")) return "Facebook";
  if (social.includes("youtube")) return "YouTube";
  if (social.includes("twitter") || social === "x") return "X";
  if (social.includes("web")) return "Sitio web";

  return tipo;
}

function SocialIcon({ tipo }: { tipo: string }) {
  const social = tipo.toLowerCase();

  if (social.includes("instagram")) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle x="17.5" y="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (social.includes("facebook")) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="M13.5 21v-8h2.8l.4-3h-3.2V8.1c0-.9.3-1.5 1.6-1.5H17V4a23 23 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.8v8h3.2Z" />
      </svg>
    );
  }

  if (social.includes("youtube")) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M21 12s0-4-1-5c-1-1-8-1-8-1s-7 0-8 1c-1 1-1 5-1 5s0 4 1 5c1 1 8 1 8 1s7 0 8-1c1-1 1-5 1-5Z" />
        <path d="m10 9 5 3-5 3V9Z" />
      </svg>
    );
  }

  if (social.includes("twitter") || social === "x") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4.5 w-4.5"
        fill="currentColor"
      >
        <path d="M18.2 3H21l-6.1 7 7.1 11h-5.6L12 14.4 6.2 21H3.4l7.3-8.3L3.8 3h5.7l4 6 4.7-6Zm-1 16h1.5L8.6 4.9H7L17.2 19Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

export default function CofradiaPage({ loaderData }: Route.ComponentProps) {
  const { cofradia } = loaderData;

  const [imagenAmpliada, setImagenAmpliada] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeDialogButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!imagenAmpliada) {
      return;
    }

    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const overflowAnterior = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      closeDialogButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setImagenAmpliada(null);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", handleKeyDown);

      if (previouslyFocusedElement?.isConnected) {
        previouslyFocusedElement.focus();
      }
    };
  }, [imagenAmpliada]);

  const enlacesSociales = cofradia.enlaces_oficiales.filter((enlace) => {
    const tipo = enlace.tipo.toLowerCase();

    return !tipo.includes("email") && !tipo.includes("correo");
  });

  const titularPrincipal = cofradia.titulares[0];

  const mostrarGalerias = cofradia.titulares.length < 3;

  return (
    <main>
      {/* HERO 1 · PRESENTACIÓN */}
      <CofradiaHero
        nombre={cofradia.nombre}
        imagenDesktop={`/${titularPrincipal?.imagen_url}/portada.webp`}
        imagenMovil={`/${titularPrincipal?.imagen_url}/portada_movil.webp`}
      />

      {/* HERO 2 · COFRADÍA */}
      <section className="flex min-h-svh bg-white text-black">
        <div className="mx-auto flex w-full max-w-360 flex-col justify-center px-6 py-20 md:px-10 md:py-24 lg:px-30 lg:py-18">
          {/* Escudo + nombre */}
          <div className="flex flex-col items-center text-center">
            {cofradia.escudo_url && (
              <img
                src={`/escudos/${cofradia.escudo_url}`}
                alt=""
                className="max-h-40 max-w-32 object-contain md:max-h-44 md:max-w-36"
              />
            )}

            <h1 className="mt-8 max-w-5xl text-4xl font-normal leading-[1.02] tracking-[-0.03em] md:text-5xl lg:text-6xl">
              {cofradia.nombre}
            </h1>
          </div>

          {/* Datos + historia */}
          <div className="mt-16 grid border-y border-black/15 lg:mt-20 lg:grid-cols-[0.42fr_0.58fr]">
            {/* Datos */}
            <aside
              aria-label="Datos de la cofradía"
              className="border-b border-black/15 py-12 lg:border-b-0 lg:border-r lg:py-14 lg:pr-16"
            >
              <dl className="space-y-12">
                {/* Fundación / Refundación */}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
                    {cofradia.anio_refundacion ? "Refundación" : "Fundación"}
                  </dt>

                  <dd className="mt-4 text-2xl tracking-[-0.03em] md:text-3xl">
                    {cofradia.anio_refundacion ??
                      cofradia.anio_fundacion ??
                      "Por confirmar"}
                  </dd>
                </div>

                {/* Sede */}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
                    Sede canónica
                  </dt>

                  <dd>
                    {cofradia.sede ? (
                      <Link
                        to={`/sedescanonicas/${cofradia.sede.slug}`}
                        className="mt-4 inline-block max-w-md text-xl leading-tight tracking-[-0.02em] transition-opacity duration-200 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:text-2xl"
                      >
                        {cofradia.sede.nombre}
                      </Link>
                    ) : (
                      <span className="mt-4 block max-w-md text-xl leading-tight tracking-[-0.02em] md:text-2xl">
                        Por confirmar
                      </span>
                    )}
                  </dd>
                </div>
              </dl>

              {/* Redes sociales */}
              <div className="mt-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
                  Redes sociales
                </p>

                {enlacesSociales.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {enlacesSociales.map((enlace) => (
                      <a
                        key={enlace.id}
                        href={enlace.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={getSocialLabel(enlace.tipo)}
                        title={getSocialLabel(enlace.tipo)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-black transition-colors duration-300 hover:border-black hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                      >
                        <SocialIcon tipo={enlace.tipo} />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm leading-6 text-black/60">
                    No tiene redes sociales disponibles.
                  </p>
                )}
              </div>
            </aside>

            {/* Historia */}
            <section className="py-12 lg:py-14 lg:pl-16">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
                Historia
              </h2>

              {cofradia.historia ? (
                <p className="mt-7 max-w-3xl text-base leading-8 text-black/75 md:text-lg md:leading-9">
                  {cofradia.historia}
                </p>
              ) : (
                <p className="mt-7 text-base leading-8 text-black/75">
                  Actualmente no hay información histórica disponible.
                </p>
              )}
            </section>
          </div>
        </div>
      </section>

      {/* HERO 3 · TITULARES */}
      {cofradia.titulares.map((titular, index) => {
        const imagenesTitular = getImagenesTitular(
          titular.imagen_url,
          titular.advocacion,
        );

        const imagenTitular = titular.imagen_url
          ? `/${titular.imagen_url}/titular.webp`
          : null;

        const esPrimero = index === 0;
        const esUltimo = index === cofradia.titulares.length - 1;

        const mostrarGaleriaTitular =
          mostrarGalerias && titular.tipo?.toUpperCase() !== "RELIQUIA";

        return (
          <section key={titular.id} className="bg-black text-white">
            <div
              className={`mx-auto w-full max-w-360 px-6 md:px-10 lg:px-30 ${
                esPrimero
                  ? "pt-20 md:pt-24 lg:pt-28"
                  : "pt-10 md:pt-12 lg:pt-20"
              } ${
                esUltimo ? "pb-20 md:pb-24 lg:pb-28" : "pb-4 md:pb-6 lg:pb-8"
              }`}
            >
              {/* Imagen principal + datos */}
              <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
                {/* Foto principal */}
                <div className="relative min-h-120 overflow-hidden bg-white/5 lg:min-h-80">
                  {imagenTitular ? (
                    <img
                      src={imagenTitular}
                      alt={titular.nombre}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-120 items-center justify-center lg:min-h-100">
                      <p className="text-sm text-white/60">
                        Imagen no disponible
                      </p>
                    </div>
                  )}
                </div>

                {/* Información */}
                <div className="flex flex-col justify-start py-12 lg:min-h-100 lg:pl-16">
                  <h2 className="max-w-3xl text-4xl font-normal leading-[1.02] tracking-[-0.03em] md:text-5xl lg:text-6xl">
                    {titular.nombre}
                  </h2>

                  {/* Datos */}
                  <dl className="mt-12 space-y-10">
                    {/* Año / siglo */}
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                        {titular.anio_realizacion
                          ? "Año"
                          : titular.siglo_realizacion
                            ? "Siglo"
                            : "Año"}
                      </dt>

                      <dd className="mt-3 text-xl">
                        {titular.anio_realizacion ??
                          titular.siglo_realizacion ??
                          "No especificado"}
                      </dd>
                    </div>

                    {/* Autor */}
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                        Autor
                      </dt>

                      <dd className="mt-3 text-xl">
                        {titular.autor ?? "Anónimo"}
                      </dd>
                    </div>

                    {titular.tipo_paso && (
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                          Tipo de paso
                        </dt>

                        <dd className="mt-3 text-xl">
                          {formatTipoPaso(titular.tipo_paso)}
                        </dd>
                      </div>
                    )}
                  </dl>

                  {/* Descripción */}
                  {titular.descripcion_breve && (
                    <div className="mt-10 border-t border-white/15 pt-8">
                      <p className="max-w-3xl text-base leading-8 text-white/75 md:text-lg md:leading-9">
                        {titular.descripcion_breve}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Galería */}
              {mostrarGaleriaTitular && imagenesTitular.length > 0 && (
                <div className="mt-10 border-t border-white/15 pt-10">
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {imagenesTitular.map((imagen, imageIndex) => {
                      const alt = `Fotografía ${imageIndex + 1} de ${titular.nombre}`;

                      return (
                        <button
                          key={imagen}
                          type="button"
                          onClick={() =>
                            setImagenAmpliada({
                              src: imagen,
                              alt,
                            })
                          }
                          aria-label={`Ampliar ${alt}`}
                          className="relative aspect-4/6 cursor-pointer overflow-hidden bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                          <img
                            src={imagen}
                            alt={alt}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Volver */}
      <div className="bg-black text-white">
        <div className="mx-auto max-w-360 px-6 pb-12 md:px-10 lg:px-30">
          <div className="border-t border-white/15 pt-6">
            <Link
              to="/cofradias"
              className="inline-flex items-center gap-3 text-sm font-medium text-white/75 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span aria-hidden="true">←</span>
              Volver a cofradías
            </Link>
          </div>
        </div>
      </div>

      {/* Imagen ampliada */}
      {imagenAmpliada && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Imagen ampliada"
          className="fixed inset-0 z-100 flex cursor-default items-center justify-center bg-black/95 p-4 md:p-8"
          onClick={() => setImagenAmpliada(null)}
        >
          <button
            ref={closeDialogButtonRef}
            type="button"
            onClick={() => setImagenAmpliada(null)}
            aria-label="Cerrar imagen ampliada"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 text-2xl font-light text-white transition-colors duration-200 hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:right-8 md:top-8"
          >
            ×
          </button>

          <img
            src={imagenAmpliada.src}
            alt={imagenAmpliada.alt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[calc(100svh-2rem)] max-w-full cursor-default object-contain md:max-h-[calc(100svh-4rem)]"
          />
        </div>
      )}
    </main>
  );
}
