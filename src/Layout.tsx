import { Component } from "solid-js";
import Header from "./components/Header";
import { RouteSectionProps } from "@solidjs/router";

const Layout: Component<RouteSectionProps> = (props) => {
  return (
    <div>
      <Header />
      <div class="px-2 md:px-4 pt-2 min-h-[100vh]">{props.children}</div>;
    </div>
  );
};

export default Layout;
