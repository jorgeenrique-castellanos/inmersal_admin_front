import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/style_1/inmersal_admin_style_1.css";
import AppContext from "./components/app_context/general_context";

export default () => {

  const [token, setToken] = React.useState(false);
  const [refreshtoken, setRefreshToken] = React.useState(false);
  const alltokens = {
    setToken: setToken,
    setRefreshToken: setRefreshToken,
    token: token,
    refreshtoken: refreshtoken
  };

  console.log('tokens');
  console.log(alltokens);

  return <Router basename={process.env.REACT_APP_BASENAME || ""}>
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
    </div>
  </Router>
};
