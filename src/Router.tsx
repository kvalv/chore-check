import { Component } from "solid-js";
import { Router as SolidRouter, Route } from "@solidjs/router";
import App from "./App";
import Tasks from "./pages/tasks";
import TaskPage from "./pages/tasks/[id]";
import TasksCreate from "./pages/tasks/create";
import TasksLayout from "./pages/tasks/layout";
import Home from "./pages/home";
import Layout from "./Layout";

const Router: Component<{}> = () => {
  return (
    <SolidRouter root={App}>
      <Route path="/" component={Layout}>
        <Route path="/" component={Home} />
        <Route path="/tasks" component={TasksLayout}>
          <Route path="/" component={Tasks} />
          <Route path="/create" component={TasksCreate} />
          <Route path="/:id" component={TaskPage} />
        </Route>
      </Route>
    </SolidRouter>
  );
};

export default Router;
