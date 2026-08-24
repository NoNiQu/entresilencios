import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { ScrollToTop } from "~/components/ScrollToTop";
import { Footer } from "~/components/layout/Footer";
import { Header } from "~/components/layout/Header";
import "./app.css";

export const links: Route.LinksFunction = () => [
  {
    rel: "preload",
    href: "/fonts/Inter-VariableFont_opsz,wght.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Meta />
        <Links />
      </head>

      <body>
        <a
          id="skip-to-content"
          href="#site-content"
          className="fixed left-4 top-4 z-999 -translate-y-24 bg-black px-4 py-3 text-sm font-medium text-white transition-transform focus:translate-y-0 focus:outline-2 focus:outline-offset-4 focus:outline-white"
        >
          Saltar al contenido principal
        </a>

        <Header />

        <div id="site-content" tabIndex={-1} className="outline-none">
          {children}
        </div>

        <div id="site-footer">
          <Footer />
        </div>

        <ScrollToTop />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const status = isRouteErrorResponse(error) ? error.status : 500;

  const isNotFound = status === 404;

  let details = isNotFound
    ? "La página que buscas no existe o ha cambiado de ubicación."
    : "Se ha producido un error inesperado. Inténtalo de nuevo dentro de unos instantes.";

  let stack: string | undefined;

  if (!isNotFound && isRouteErrorResponse(error) && error.statusText) {
    details =
      status >= 500
        ? "Se ha producido un error inesperado. Inténtalo de nuevo dentro de unos instantes."
        : error.statusText;
  }

  if (import.meta.env.DEV && error && error instanceof Error) {
    stack = error.stack;
  }

  return (
    <main className="bg-white text-black">
      <section className="mx-auto flex min-h-[75svh] max-w-360 items-center px-6 py-32 md:px-10 lg:px-30">
        <div className="w-full">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
            {isNotFound ? "Página no encontrada" : "Error del servidor"}
          </p>

          <div className="border-t border-black/15 pt-8">
            <div className="grid gap-10 md:grid-cols-[0.55fr_1fr] md:gap-16">
              <div>
                <p className="font-serif text-[clamp(5rem,15vw,10rem)] leading-[0.8] tracking-[-0.06em]">
                  {status}
                </p>
              </div>

              <div className="flex max-w-2xl flex-col justify-end">
                <h1 className="font-serif text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                  {isNotFound
                    ? "Esta página se ha perdido entre silencios."
                    : "Algo no ha salido como esperábamos."}
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-black/65 sm:text-base">
                  {details}
                </p>

                <div className="mt-10">
                  <Link
                    to="/"
                    className="group inline-flex cursor-pointer items-center gap-4 border-b border-black/25 pb-2 text-sm font-medium transition-colors duration-300 hover:border-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                  >
                    Volver al inicio
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {stack && (
            <details className="mt-16 border-t border-black/15 pt-6">
              <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
                Detalles técnicos
              </summary>

              <pre className="mt-6 w-full overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-black/65">
                <code>{stack}</code>
              </pre>
            </details>
          )}
        </div>
      </section>
    </main>
  );
}
