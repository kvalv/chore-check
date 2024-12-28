import { Component } from "solid-js";
import Header from "./components/Header";

type Props = {
  children: any;
};

const Layout: Component<Props> = (props) => {
  return (
    <div>
      <Header />
      <div class="px-2 h-full">{props.children}</div>;
    </div>
  );
};

export default Layout;
