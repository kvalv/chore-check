import { useZero } from "@/context";
import { useQuery } from "@rocicorp/zero/solid";
import { RouteSectionProps, useNavigate } from "@solidjs/router";
import { Component, createSignal, For, Match, Switch } from "solid-js";
import LogSection from "./LogSection";
import { timeIntervals } from "@/lib/timeInterval";
import { ArrowLeft } from "phosphor-solid";

const tabs = ["Details", "History"] as const;
type Tab = (typeof tabs)[number];

const TaskPage: Component<RouteSectionProps> = (props) => {
  const id = props.params.id;
  const z = useZero();
  const navigate = useNavigate();

  const taskQuery = useQuery(() => z.query.task.one().where("id", id));

  const users = useQuery(() => z.query.user.orderBy("name", "asc"));
  const locations = useQuery(() => z.query.location.orderBy("name", "asc"));

  const task = taskQuery();

  const [title, setTitle] = createSignal(task?.title ?? "");
  const [responsibleID, setResponsibleID] = createSignal(
    task?.responsibleID ?? "",
  );
  const [description, setDescription] = createSignal(task?.description ?? "");
  const [interval, setInterval] = createSignal(task?.intervalSeconds ?? 0);
  const [locationID, setLocationID] = createSignal(task?.locationID ?? "");
  const [activeTab, setTab] = createSignal<Tab>("Details");

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

  const Details = () => (
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
      <button
        disabled={task?.responsibleID !== z.userID}
        class="btn btn-error"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
  const Logs = () => <LogSection />;

  return (
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-1">
        <button class="btn btn-ghost" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <div class="prose">
          <h3>{activeTab()}</h3>
        </div>
      </div>

      <div role="tablist" class="pt-2 pb-4 tabs tabs-bordered tabs-xs">
        <For each={tabs}>
          {(tab) => (
            <a
              role="tab"
              class="tab"
              classList={{
                "tab-active": activeTab() === tab,
              }}
              onClick={() => setTab(tab)}
            >
              {tab}
            </a>
          )}
        </For>
      </div>

      <Switch>
        <Match when={activeTab() === "Details"}>
          <Details />
        </Match>
        <Match when={activeTab() === "History"}>
          <Logs />
        </Match>
      </Switch>
    </div>
  );
};

export default TaskPage;
