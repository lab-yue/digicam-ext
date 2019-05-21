import { css, Global } from "@emotion/core";
import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import routes from "./Routes";

export default function App() {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            font-size: 18px;
            margin: 0;
            padding: 0;
          }
        `}
      />
      <HashRouter>
        <Switch>
          {routes.map((route, i) => (
            <Route
              exact
              key={`r-${i}`}
              path={route.url}
              component={route.component}
            />
          ))}
        </Switch>
      </HashRouter>
    </>
  );
}
