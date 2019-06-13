import React from "react";
import About from "./pages/Options";
import Home from "./pages/Popup";

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
