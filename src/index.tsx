import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "core/pages/Authentication/Login";
import i18nTranslation from "core/config/i18n";
import { httpInterceptor } from "core/config/http";
// Import styles
import "assets/scss/app.scss";
import LoadingPage from "core/pages/LoadingPage/LoadingPage";
import { utilService } from "core/services/common-services/util-service";

const PrivateRoute = React.lazy(async () => {
  await Promise.all([
    i18nTranslation.initialize(),
    httpInterceptor.initialize(),
    utilService.cacheImages([]),
  ]);
  return import("core/pages/Authentication/PrivateRoute");
});

const app = (
  <BrowserRouter>
    <React.Suspense fallback={<LoadingPage />}>
      <Switch>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/login`}
          component={Login}
        />
        <PrivateRoute path="/" />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
