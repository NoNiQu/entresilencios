import type { ReactNode } from "react";

export type InformationPageLayoutProps = {
  title: string;
  children: ReactNode;
  wide?: boolean;
};

export type InformationSectionProps = {
  title: string;
  children: ReactNode;
};