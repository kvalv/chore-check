import { Component, createSignal } from "solid-js";
import Table from "./Table";
import CompleteTaskModal from "./CompleteTaskModal";
import { Log } from "@/schema";
import toast from "solid-toast";
import { useZero } from "@/context";
import { useQuery } from "@rocicorp/zero/solid";
import dayjs from "dayjs";

type Props = {};

const Tasks: Component<Props> = () => {
  const [taskID, setTaskID] = createSignal<string | undefined>(undefined);
  const z = useZero();

  const currentTask = useQuery(() =>
    z.query.task.where("id", taskID() ?? "").one(),
  );

  function onSubmitLog(log: Log) {
    const task = currentTask();
    if (!task) return;
    z.mutate.log.insert(log);

    // we're also going to update the task for the next due date
    const defaultDueDate = dayjs().add(1, "week").valueOf();
    const nextDueDate = task.intervalSeconds
      ? dayjs().add(task.intervalSeconds, "seconds").valueOf()
      : defaultDueDate;
    z.mutate.task.update({
      id: log.taskID,
      dueDate: nextDueDate,
    });
    toast.success("Task completed.");
    setTaskID(undefined);
  }

  return (
    <div class="w-full pt-2">
      <Table onComplete={(id) => setTaskID(id)} />
      <CompleteTaskModal
        onSubmit={onSubmitLog}
        open={Boolean(taskID())}
        taskID={taskID() ?? ""}
        onClose={() => setTaskID(undefined)}
      />
    </div>
  );
};

export default Tasks;
