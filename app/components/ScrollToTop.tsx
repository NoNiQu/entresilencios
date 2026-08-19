import { useEffect, useRef, useState } from "react";

function isTransparent(color: string) {
  return (
    color === "transparent" ||
    color === "rgba(0, 0, 0, 0)" ||
    color.endsWith(", 0)")
  );
}

function isDarkColor(color: string) {
  const values = color.match(/[\d.]+/g);

  if (!values || values.length < 3) {
    return true;
  }

  const red = Number(values[0]);
  const green = Number(values[1]);
  const blue = Number(values[2]);

  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

  return luminance < 0.5;
}

function getBackgroundUnderButton(button: HTMLButtonElement) {
  const rect = button.getBoundingClientRect();

  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  const elements = document.elementsFromPoint(x, y);

  const elementUnderButton = elements.find(
    (element) => element !== button && !button.contains(element),
  );

  if (!elementUnderButton) {
    return true;
  }

  let currentElement: Element | null = elementUnderButton;

  while (currentElement) {
    const backgroundColor =
      window.getComputedStyle(currentElement).backgroundColor;

    if (!isTransparent(backgroundColor)) {
      return isDarkColor(backgroundColor);
    }

    currentElement = currentElement.parentElement;
  }

  return true;
}

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOnDarkBackground, setIsOnDarkBackground] = useState(true);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frameId: number;

    const updateButton = () => {
      const button = buttonRef.current;

      if (!button) {
        return;
      }

      setIsVisible(window.scrollY > 500);

      const footer = document.getElementById("site-footer");

      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const buttonStyles = window.getComputedStyle(button);

        const buttonBottom = Number.parseFloat(buttonStyles.bottom) || 0;
        const gap = 16;

        const limit = window.innerHeight - buttonBottom + gap;

        if (footerRect.top < limit) {
          const footerOffset = limit - footerRect.top;

          button.style.transform = `translateY(-${footerOffset}px)`;
        } else {
          button.style.transform = "translateY(0)";
        }
      } else {
        button.style.transform = "translateY(0)";
      }

      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        if (buttonRef.current) {
          setIsOnDarkBackground(getBackgroundUnderButton(buttonRef.current));
        }
      });
    };

    updateButton();

    window.addEventListener("scroll", updateButton, { passive: true });
    window.addEventListener("resize", updateButton);

    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener("scroll", updateButton);
      window.removeEventListener("resize", updateButton);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={scrollToTop}
      aria-label="Volver al inicio de la página"
      className={[
        "fixed bottom-5 right-5 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border",
        "transition-[opacity,background-color,color,border-color] duration-300",
        "focus-visible:outline-2 focus-visible:outline-offset-4",
        "md:bottom-8 md:right-8",
        isOnDarkBackground
          ? "border-white bg-white text-black focus-visible:outline-white"
          : "border-black bg-black text-white focus-visible:outline-black",
        isVisible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8">
        <path d="M12 7 5.5 15h13L12 7Z" fill="currentColor" />
      </svg>
    </button>
  );
}
