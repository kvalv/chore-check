import { Component } from "solid-js";
import { Router as SolidRouter, Route } from "@solidjs/router";
import App from "./App";
import Tasks from "./pages/tasks";
import TaskPage from "./pages/tasks/[id]";
import TasksCreate from "./pages/tasks/create";
import TasksLayout from "./pages/tasks/layout";

const Router: Component<{}> = () => {
  return (
    <SolidRouter root={App}>
      <Route path="/tasks" component={TasksLayout}>
        <Route path="/" component={Tasks} />
        <Route path="/create" component={TasksCreate} />
        <Route path="/:id" component={TaskPage} />
      </Route>
    </SolidRouter>
  );
};

export default Router;
