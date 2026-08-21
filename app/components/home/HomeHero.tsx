export function HomeHero() {
  const scrollToContent = () => {
    const hero = document.getElementById("home-hero");

    hero?.nextElementSibling?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="home-hero"
      className="relative h-svh min-h-190 overflow-hidden bg-black text-white md:h-screen"
    >
      {/* Imagen de fondo */}
      <picture>
        <source media="(max-width: 767px)" srcSet="/home/portadamovil.webp" />

        <img
          src="/home/portada.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      {/* Oscurecimiento general */}
      <div className="absolute inset-0 bg-black/7" />

      {/* Gradiente */}
      <div className="absolute inset-0 bg-linear-to-b from-black/35 via-black/5 to-black/70" />

      {/* Indicador de scroll */}
      <button
        type="button"
        onClick={scrollToContent}
        aria-label="Explorar la guía"
        className="group absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-3 text-white/75 transition-colors duration-300 hover:text-white md:bottom-10"
      >
        <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.28em]">
          Explora la guía
        </span>

        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
        >
          <path d="M12 17 5.5 9h13L12 17Z" fill="currentColor" />
        </svg>
      </button>
    </section>
  );
}
