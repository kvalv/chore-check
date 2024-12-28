import { Component, createSignal, Show } from "solid-js";
import { A } from "@solidjs/router";
import Table from "./Table";
import CompletionModal from "./CompletionModal";
import { Log } from "@/schema";
import toast from "solid-toast";
import { useZero } from "@/context";

type Props = {};

const Tasks: Component<Props> = () => {
  const [taskID, setTaskID] = createSignal<string | undefined>(undefined);
  const z = useZero();

  function onSubmitLog(log: Log) {
    z.mutate.log.insert(log);
    toast.success("Task completed.");
  }

  return (
    <div class="w-full pt-2">
      {/*dont show the create for now...*/}
      <Show when={false}>
        <A href="/tasks/create">
          <button class="btn btn-neutral btn-sm">Create new</button>
        </A>
      </Show>

      <Table onComplete={(id) => setTaskID(id)} />
      <CompletionModal
        onSubmit={onSubmitLog}
        open={Boolean(taskID())}
        taskID={taskID() ?? ""}
        onClose={() => setTaskID(undefined)}
      />
    </div>
  );
};

export default Tasks;
