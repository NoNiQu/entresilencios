import { useState } from "react";
import { siteConfig } from "~/config/site";

export function CopyEmailButton() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setStatus("copied");

      window.setTimeout(() => {
        setStatus("idle");
      }, 2500);
    } catch {
      setStatus("error");

      window.setTimeout(() => {
        setStatus("idle");
      }, 2500);
    }
  }

  return (
    <div>
      <div className="inline-flex min-h-11 w-full max-w-105 items-stretch overflow-hidden bg-black text-white md:min-h-12">
        <div className="flex min-w-0 flex-1 items-center px-4 md:px-5">
          <span className="truncate text-[13px] font-semibold sm:text-sm">
            {status === "copied"
              ? "Correo copiado"
              : status === "error"
                ? "No se pudo copiar"
                : siteConfig.email}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopyEmail}
          aria-label={`Copiar correo electrónico ${siteConfig.email}`}
          className="flex w-12 shrink-0 cursor-pointer items-center justify-center border-l border-white/15 transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:w-14"
        >
          {status === "copied" ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {status === "copied" && "El correo se ha copiado al portapapeles."}

        {status === "error" &&
          "El navegador no ha permitido copiar la dirección."}
      </p>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4.5 w-4.5"
    >
      <rect x="9" y="8" width="10" height="11" rx="1.5" />
      <path d="M15 8V5.5A1.5 1.5 0 0 0 13.5 4H5.5A1.5 1.5 0 0 0 4 5.5v10A1.5 1.5 0 0 0 5.5 17H7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4.5 w-4.5"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}
