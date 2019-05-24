import React from "react";
import Home from "./pages/Home";
import About from "./pages/Options";

interface Routes {
  title: string;
  url: string;
  component: () => JSX.Element;
}

const routes: Routes[] = [
  {
    title: "Home",
    url: "/",
    component: Home,
  },
  {
    title: "About",
    url: "/options",
    component: About,
  },
];

export default routes;
