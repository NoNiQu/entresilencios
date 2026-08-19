import { Link, useLocation } from "react-router";
import type { FooterColumnProps } from "~/types/footer";
import type { NavigationLink } from "~/types/navigation";

const navigationLinks = [
  { label: "Cofradías", to: "/cofradias" },
  { label: "Procesiones", to: "/procesiones" },
  { label: "Sedes Canónicas", to: "/sedescanonicas" },
] satisfies NavigationLink[];

const informationLinks = [
  { label: "Aviso legal", to: "/aviso-legal" },
  { label: "Privacidad", to: "/privacidad" },
  { label: "Contacto", to: "/contacto" },
] satisfies NavigationLink[];

export function Footer() {
  const { pathname } = useLocation();

  const isHomePage = pathname === "/";
  const currentYear = new Date().getFullYear();

  const logo = (
    <img
      src="/Logo_WEB.png"
      alt="Entre Silencios — Semana Santa Toledo"
      className="block h-auto w-62.5"
    />
  );

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-360 px-8 pb-8 pt-16">
        <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-[1.5fr_0.75fr_0.75fr]">
          {/* Marca y descripción */}
          <div className="self-start">
            {isHomePage ? (
              <div aria-label="Entre Silencios">{logo}</div>
            ) : (
              <Link to="/" aria-label="Volver a la página de inicio">
                {logo}
              </Link>
            )}

            <p className="mt-5 max-w-md text-sm leading-6 text-white/75">
              Guía independiente y no oficial de la Semana Santa de Toledo,
              creada para consultar cofradías, procesiones, horarios e
              itinerarios.
            </p>
          </div>

          <FooterColumn title="Navegación" links={navigationLinks} />

          <FooterColumn title="Información" links={informationLinks} />
        </div>

        {/* Parte inferior */}
        <div className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-7 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <p className="text-sm text-white/75">
            © {currentYear} Entre Silencios
          </p>

          <p className="max-w-lg text-xs leading-5 text-white/75 lg:text-right">
            <span className="block">
              La información publicada puede sufrir modificaciones.
            </span>

            <span className="block">
              Consulta siempre los canales oficiales de las cofradías antes de
              asistir a una procesión.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="self-start">
      <h2 className="m-0 text-xs font-semibold uppercase leading-none tracking-[0.2em] text-white/75">
        {title}
      </h2>

      <ul className="mt-6 space-y-4">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-sm text-white/75 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
