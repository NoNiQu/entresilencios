import type { ReactNode } from "react";

type PageTitleHeaderProps = {
  title: string;
  children?: ReactNode;
};

export function PageTitleHeader({ title, children }: PageTitleHeaderProps) {
  return (
    <section className="mx-auto max-w-360 px-6 pt-44 md:px-10 lg:px-30 lg:pt-57">
      <div>
        <h1 className="m-0 max-w-6xl text-6xl font-normal leading-none tracking-[-0.03em] md:text-7xl">
          {title}
        </h1>

        {children}
      </div>
    </section>
  );
}
