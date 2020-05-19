import React, { useEffect, useState, useContext } from "react";
import { Col, Row } from "reactstrap";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
import ActionBarPadrao from "../ActionBarPadrao/ActionBarPadrao";
import "react-circular-progressbar/dist/styles.css";

import { auth } from "../firebase";
import { AuthContext } from "../utils";
import Menu from "../Menu/Menu";
import Login from "../Login/Login";
import Routes from "./Routes";

export default function App() {
  const [user, setUser] = useState();
  const [authLoading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      setAuthenticated(user !== null);

      // @ts-ignore
      const loading = document.querySelector(".loading");
      if (loading) {
        loading.remove();
      }
    });
  }, []);

  function PrivateRoute({ children, ...rest }: RouteProps) {
    const { isAuthenticated, authLoading } = useContext(AuthContext);
    return (
      <Route
        {...rest}
        render={({ location }) =>
          authLoading || isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, authLoading, user }}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="*">
            <Row style={{ margin: 0 }}>
              <Col style={{ paddingRight: 0, paddingLeft: 0 }} sm="2">
                <Menu />
              </Col>
              <Col sm="10">
                <ActionBarPadrao />
                <Routes />
              </Col>
            </Row>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
