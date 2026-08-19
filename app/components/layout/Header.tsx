import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

const navigation = [
  { label: "Cofradías", to: "/cofradias" },
  { label: "Procesiones", to: "/procesiones" },
  { label: "Sedes Canónicas", to: "/sedescanonicas" },
  { label: "Contacto", to: "/contacto" },
  { label: "FAQ", to: "/faq" },
];

export function Header() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /*
   * Cierra el menú cuando el usuario cambia de página.
   */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  /*
   * Bloquea el scroll mientras el menú móvil está abierto
   * y permite cerrarlo mediante la tecla Escape.
   */
  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const desktopLogo = (
    <img
      src="/Logo_WEB.png"
      alt="Entre Silencios — Semana Santa Toledo"
      className="h-auto w-62.5"
    />
  );

  const mobileLogo = (
    <img
      src="/Logo_WEB.png"
      alt="Entre Silencios — Semana Santa Toledo"
      className="h-auto w-47.5"
    />
  );

  return (
    <>
      <header
        className={[
          "absolute inset-x-0 top-0 z-50 text-white",
          "transition-colors duration-300",
          isMenuOpen ? "bg-black lg:bg-transparent" : "bg-transparent",
        ].join(" ")}
      >
        {/* CABECERA DE ESCRITORIO */}
        <div className="hidden lg:block">
          <div className="mx-auto flex h-45 max-w-1440px items-center justify-between px-45">
            {isHomePage ? (
              <div aria-label="Entre Silencios, página de inicio">
                {desktopLogo}
              </div>
            ) : (
              <Link to="/" aria-label="Volver a la página de inicio">
                {desktopLogo}
              </Link>
            )}

            <nav aria-label="Navegación principal">
              <ul className="flex items-center gap-9">
                {navigation.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        [
                          "relative py-2 text-sm font-medium tracking-wide",
                          "transition-opacity duration-200",
                          "hover:opacity-70",
                          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                          "after:absolute after:inset-x-0 after:-bottom-1 after:h-px",
                          "after:origin-left after:bg-white after:transition-transform after:duration-200",
                          isActive
                            ? "after:scale-x-100"
                            : "after:scale-x-0 hover:after:scale-x-100",
                        ].join(" ")
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* CABECERA MÓVIL */}
        <div className="grid h-45 grid-cols-[48px_1fr_48px] items-center px-5 lg:hidden">
          <button
            type="button"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((currentState) => !currentState)}
            className="relative flex h-12 w-12 items-center justify-center justify-self-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span className="sr-only">
              {isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            </span>

            <span
              aria-hidden="true"
              className={[
                "absolute h-px w-7 bg-white transition-transform duration-300",
                isMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.75",
              ].join(" ")}
            />

            <span
              aria-hidden="true"
              className={[
                "absolute h-px w-7 bg-white transition-opacity duration-300",
                isMenuOpen ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />

            <span
              aria-hidden="true"
              className={[
                "absolute h-px w-7 bg-white transition-transform duration-300",
                isMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.75",
              ].join(" ")}
            />
          </button>

          <div className="justify-self-center">
            {isHomePage ? (
              <div aria-label="Entre Silencios, página de inicio">
                {mobileLogo}
              </div>
            ) : (
              <Link
                to="/"
                aria-label="Volver a la página de inicio"
                className="block transition-opacity duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {mobileLogo}
              </Link>
            )}
          </div>

          {/*
           * Espacio vacío que compensa el botón izquierdo
           * y mantiene el logo perfectamente centrado.
           */}
          <div aria-hidden="true" className="h-12 w-12" />
        </div>
      </header>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      <nav
        id="mobile-navigation"
        aria-label="Navegación móvil"
        className={[
          "fixed inset-x-0 bottom-0 top-24 z-40 bg-black text-white",
          "overflow-y-auto transition-all duration-300 lg:hidden",
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0",
        ].join(" ")}
      >
        <div className="flex min-h-full flex-col px-8 pb-10 pt-10">
          <ul className="mt-10 border-t border-white/15">
            {navigation.map((item) => (
              <li key={item.to} className="border-b border-white/15">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "group flex min-h-20 items-center justify-between gap-6",
                      "text-xl transition-colors duration-200",
                      "focus-visible:outline-2",
                      "focus-visible:-outline-offset-2",
                      "focus-visible:outline-white",
                      isActive
                        ? "text-white"
                        : "text-white/75 hover:text-white",
                    ].join(" ")
                  }
                >
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
