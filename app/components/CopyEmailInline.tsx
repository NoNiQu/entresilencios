import { useState } from "react";
import { siteConfig } from "~/config/site";

export function CopyEmailInline() {
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <span className="inline-flex items-center gap-2 align-middle">
      <span>{siteConfig.email}</span>

      <button
        type="button"
        onClick={handleCopyEmail}
        aria-label={
          copied
            ? "Correo electrónico copiado"
            : `Copiar correo electrónico ${siteConfig.email}`
        }
        title={copied ? "Correo copiado" : "Copiar correo"}
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-black/75 transition-colors duration-200 border-black/10 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black cursor-pointer"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>

      <span className="sr-only" aria-live="polite">
        {copied ? "Correo electrónico copiado al portapapeles." : ""}
      </span>
    </span>
  );
}

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4.5 w-4.5"
    >
      <rect x="9" y="8" width="10" height="11" rx="1.5" />

      <path d="M15 8V5.5A1.5 1.5 0 0 0 13.5 4h-8A1.5 1.5 0 0 0 4 5.5v10A1.5 1.5 0 0 0 5.5 17H7" />
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
