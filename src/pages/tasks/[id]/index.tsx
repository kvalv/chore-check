import { useZero } from "@/context";
import { useQuery } from "@rocicorp/zero/solid";
import { RouteSectionProps, useNavigate } from "@solidjs/router";
import { Component, createSignal, For } from "solid-js";
import LogSection from "./LogSection";
import { timeIntervals } from "@/lib/timeInterval";
import { ArrowLeft } from "phosphor-solid";

const TaskPage: Component<RouteSectionProps> = (props) => {
  const id = props.params.id;
  const z = useZero();
  const navigate = useNavigate();

  const taskQuery = useQuery(() => z.query.task.one().where("id", id));

  const users = useQuery(() => z.query.user);
  const locations = useQuery(() => z.query.location);

  const task = taskQuery();

  const [title, setTitle] = createSignal(task?.title ?? "");
  const [responsibleID, setResponsibleID] = createSignal(
    task?.responsibleID ?? "",
  );
  const [description, setDescription] = createSignal(task?.description ?? "");
  const [interval, setInterval] = createSignal(task?.intervalSeconds ?? 0);
  const [locationID, setLocationID] = createSignal(task?.locationID ?? "");

  // if (!task) {
  //   return <div>Task not found {id}</div>;
  // }
  function handleCreate() {
    z.mutate.task.update({
      id,
      title: title(),
      responsibleID: responsibleID(),
      description: description(),
      intervalSeconds: interval(),
      locationID: locationID(),
    });
  }

  function handleDelete() {
    z.mutate.task.delete({ id });
    navigate("/tasks");
  }

  return (
    <div class="prose">
      <div class="flex gap-1">
        <button class="btn btn-ghost" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <h1>{title()}</h1>
      </div>

      <div class="flex flex-col gap-4">
        <input
          value={title()}
          placeholder="Title"
          class="input input-bordered"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          class="textarea textarea-bordered w-full"
          value={description()}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
        ></textarea>

        <div class="flex gap-1 w-full">
          <label class="flex-1">
            <span>Responsible</span>
            <select
              class="select select-bordered w-full"
              onChange={(e) => setResponsibleID(e.target.value)}
              value={responsibleID()}
            >
              <For each={users()}>
                {(user) => <option value={user.id}>{user.name}</option>}
              </For>
            </select>
          </label>

          <label class="flex-1">
            <span>Location</span>
            <select
              class="select select-bordered w-full"
              onChange={(e) => setLocationID(e.target.value)}
              value={locationID()}
            >
              <For each={locations()}>
                {(loc) => <option value={loc.id}>{loc.name}</option>}
              </For>
            </select>
          </label>
        </div>

        <label>
          <span>Interval</span>
          <select
            class="select select-bordered w-full"
            onChange={(e) => setInterval(parseInt(e.target.value))}
            value={interval()}
          >
            <For each={Object.values(timeIntervals)}>
              {(interval) => (
                <option value={interval.minutes}>{interval.label}</option>
              )}
            </For>
          </select>
        </label>

        <button class="btn btn-neutral" onClick={handleCreate}>
          Update task
        </button>
        <LogSection />
        <button
          disabled={task?.responsibleID !== z.userID}
          class="btn btn-error"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskPage;
