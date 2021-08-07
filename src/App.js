import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import routes from "./routes";
import withTracker from "./withTracker";
import _ from "lodash";

import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/style_1/inmersal_admin_style_1.css";
import AppContext from "./components/app_context/general_context";
import LoginUser from "./views/15_view_login_user";
import { Login, DefaultLayout } from "./layouts";

export default () => {
  const [token, setToken] = React.useState("");
  const [refreshtoken, setRefreshToken] = React.useState(false);
  const alltokens = {
    setToken: setToken,
    setRefreshToken: setRefreshToken,
    token: token,
    refreshtoken: refreshtoken
  };

  const renderLogin = (
    <AppContext.Provider value={alltokens}>
      <LoginUser />
      <Login />
      {/* <DefaultLayout/> */}
    </AppContext.Provider>
  );

  const renderMenu = (
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <div>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={withTracker(props => {
                return (
                  <route.layout {...props}>
                    <AppContext.Provider value={alltokens}>
                      <route.component {...props} />
                    </AppContext.Provider>
                  </route.layout>
                );
              })}
            />
          );
        })}
        <Redirect to="/" />
      </div>
    </Router>
  );

  const renderFinal = () => (_.isEmpty(token) ? renderLogin : renderMenu);
  // const renderFinal = () => _.isEmpty(token) ? renderMenu : renderMenu;

  return <>{renderFinal()}</>;
};
