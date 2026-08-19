import type { NavigationLink } from "~/types/navigation";

export type FooterColumnProps = {
  title: string;
  links: readonly NavigationLink[];
};