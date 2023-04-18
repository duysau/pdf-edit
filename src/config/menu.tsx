import { ReactNode } from "react";
import { TFunction } from "i18next";
import { translate } from "core/config/i18n";
import { Home16 } from "@carbon/icons-react";
import { HOME_ROUTE } from "./route";

export interface Menu {
  name?: string | TFunction;
  icon?: string | ReactNode;
  link: string;
  children?: Menu[];
  active?: boolean;
  show?: boolean;
}

export const menu: Menu[] = [
  {
    name: translate("Home"),
    icon: <Home16 />,
    link: HOME_ROUTE,
    show: true,
    active: false,
  },
];
