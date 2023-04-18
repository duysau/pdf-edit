import { ROOT_ROUTE } from "core/config/consts";
import PdfPage from "pages/PdfPage";
import { join } from "path";

export interface Route {
  path: string;
  component:
    | ((props?: any) => JSX.Element)
    | React.LazyExoticComponent<(props?: any) => JSX.Element>;
  exact?: boolean;
}
/* Routes */
export const HOME_ROUTE: string = ROOT_ROUTE ? join(ROOT_ROUTE + "/") : "/";

/* Routes component*/

const userRoutes: Route[] = [
  // Adding routes here:
  {
    path: "/",
    component: () => <PdfPage />,
  },

  // This base route should be at the end of all other routes
  {
    path: `${process.env.PUBLIC_URL}/`,
    exact: true,
    component: () => <></>,
  },
];

export { userRoutes };
