import type {
  InformationPageLayoutProps,
  InformationSectionProps,
} from "~/types/information";

export function InformationPageLayout({
  title,
  children,
  wide = false,
}: InformationPageLayoutProps) {
  return (
    <>
      <div className="bg-black text-white">
        <section className="mx-auto flex min-h-69 max-w-360 items-end px-6 pb-8 pt-20 md:px-10 lg:min-h-102 lg:px-30 lg:pb-27 lg:pt-44">
          <h1 className="m-0 text-5xl font-normal leading-none tracking-[-0.03em] md:text-7xl">
            {title}
          </h1>
        </section>
      </div>

      <main className="bg-white text-black">
        <div
          className={[
            "mx-auto px-6 py-16 md:px-10 lg:py-24",
            wide ? "max-w-360 lg:px-30" : "max-w-230",
          ].join(" ")}
        >
          {children}
        </div>
      </main>
    </>
  );
}

export function InformationSection({
  title,
  children,
}: InformationSectionProps) {
  return (
    <section className="border-b border-black/15 py-10 first:pt-0 last:border-b-0 last:pb-0">
      <h2 className="text-2xl font-medium leading-tight md:text-3xl">
        {title}
      </h2>

      <div className="mt-5 space-y-4 text-[15px] leading-7 text-black/75 md:text-base">
        {children}
      </div>
    </section>
  );
}
