import { Route, Redirect } from "react-router-dom";
import * as Cookie from "js-cookie";
import authenticationService from "core/services/common-services/authentication-service";
import App from "app/App";

const PrivateRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        //Fake authentication data:
        const currentUser = authenticationService.currentUserValue || {};
        const token = Cookie.get("Token") || "Token";

        if (!currentUser || !token) {
          return (
            <Redirect
              to={{
                pathname: `${process.env.PUBLIC_URL}/login`,
                state: { from: props.location },
              }}
            />
          );
        }
        return <App />;
      }}
    />
  );
};

export default PrivateRoute;
