import { Component, Show } from "solid-js";
import { A } from "@solidjs/router";
import Table from "./Table";

type Props = {};

const Tasks: Component<Props> = () => {
  return (
    <div class="w-full pt-2">
      {/*dont show the create for now...*/}
      <Show when={false}>
        <A href="/tasks/create">
          <button class="btn btn-neutral btn-sm">Create new</button>
        </A>
      </Show>

      <Table />
    </div>
  );
};

export default Tasks;
