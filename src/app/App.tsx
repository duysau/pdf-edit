import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AppStateContext } from "./AppContext";
import { authorizationService } from "core/services/common-services/authorization-service";
import ErrorPage, { errorHandler } from "core/pages/ErrorPage/ErrorPage";
import { Route as RouteInterface, userRoutes as routes } from "config/route";
import { Route, Switch } from "react-router-dom";
import Layout from "layout/Layout";

/** Lazyload route  */
const lazyRoutes: RouteInterface[] = [
  {
    path: "route_path",
    component: React.lazy(
      () =>
        import(
          /* webpackChunkName: "[file_template_page]" */ "./../core/pages/FileTemplate/FileTemplate"
        )
    ),
  },
];

const App = () => {
  const { authorizationData } = authorizationService.useAuthorizedApp();

  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorPage} onError={errorHandler}>
        <AppStateContext.Provider value={authorizationData}>
          <Layout>
            <React.Suspense fallback={<span>Loading...</span>}>
              <Switch>
                {lazyRoutes &&
                  lazyRoutes.length > 0 &&
                  lazyRoutes.map(({ path, component: LazyComponent }) => (
                    <Route
                      key={path}
                      path={path}
                      render={() => {
                        return (
                          <React.Suspense fallback={<span>Loading...</span>}>
                            <LazyComponent />
                          </React.Suspense>
                        );
                      }}
                    ></Route>
                  ))}
                {routes &&
                  routes.length > 0 &&
                  routes.map(({ path, component }) => (
                    <Route key={path} path={path} component={component}></Route>
                  ))}
              </Switch>
            </React.Suspense>
          </Layout>
        </AppStateContext.Provider>
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default App;
