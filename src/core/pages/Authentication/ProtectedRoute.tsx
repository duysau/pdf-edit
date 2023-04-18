import { FORBIDENT_ROUTE } from "core/config/consts";
import { Redirect, Route } from "react-router-dom";

export function ProtectedRoute({
  component: Component,
  auth,
  redirectPath,
  ...rest
}: any) {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectPath ? redirectPath : FORBIDENT_ROUTE} />
        )
      }
    />
  );
}
