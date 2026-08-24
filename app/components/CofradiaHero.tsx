import type { CofradiaHeroProps } from "~/types/cofradia-hero";

export function CofradiaHero({
  nombre,
  imagenDesktop,
  imagenMovil,
}: CofradiaHeroProps) {
  const imagenDesktop2K = imagenDesktop.replace(
    /portada\.webp$/,
    "portada_2k.webp",
  );

  const scrollToContent = () => {
    const hero = document.getElementById("cofradia-hero");

    hero?.nextElementSibling?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      id="cofradia-hero"
      className="relative h-svh min-h-190 overflow-hidden bg-black text-white md:h-screen"
    >
      {/* Imagen de fondo */}
      {/* Imagen de fondo */}
      <picture>
        {/* Móvil */}
        <source media="(max-width: 767px)" srcSet={imagenMovil} />

        {/* Escritorio: Full HD / 2K */}
        <source
          media="(min-width: 768px)"
          srcSet={`${imagenDesktop} 1920w, ${imagenDesktop2K} 2560w`}
          sizes="100vw"
        />

        <img
          src={imagenDesktop}
          alt={nombre}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      {/* Oscurecimiento general */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Gradiente */}
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/5 to-black/70" />

      {/* Indicador de scroll */}
      <button
        type="button"
        onClick={scrollToContent}
        aria-label="Explorar la cofradía"
        className="group absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-3 text-white/75 transition-colors duration-300 hover:text-white md:bottom-10"
      >
        <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.28em]">
          Explorar
        </span>

        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
        >
          <path d="M12 17 5.5 9h13L12 17Z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
