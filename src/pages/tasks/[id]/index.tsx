import { useZero } from "@/context";
import { useQuery } from "@rocicorp/zero/solid";
import { RouteSectionProps } from "@solidjs/router";
import { Component, Show } from "solid-js";
import LogSection from "./LogSection";
import dayjs from "dayjs";
import { WarningCircle } from "phosphor-solid";

const TaskPage: Component<RouteSectionProps> = (props) => {
  const id = props.params.id;
  const z = useZero();

  const taskQuery = useQuery(() => z.query.task.one().where("id", id));

  const task = taskQuery();
  if (!task) {
    return <div>Task not found {id}</div>;
  }

  return (
    <div class="prose">
      <h1>{task.title}</h1>
      <Show when={task.description != null} fallback={<p>No description</p>}>
        <p>{task.description}</p>
      </Show>
      <Show
        when={dayjs(task.dueDate).isBefore(dayjs())}
        fallback={
          <div role="alert" class="alert">
            <WarningCircle />
            <span>{dayjs(task.dueDate).get("days")} days overdue</span>
          </div>
        }
      >
        <p>Next due date is {dayjs(task.dueDate).toNow()}</p>
      </Show>

      <LogSection />
    </div>
  );
};

export default TaskPage;