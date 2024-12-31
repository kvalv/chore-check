import { Component, createSignal, For } from "solid-js";
import { User, Location, Task } from "@/schema";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import { timeIntervals } from "@/lib/timeInterval";
import { useZero } from "@/context";

type Props = {
  onCreate: (task: Task) => void;
  users: readonly User[];
  locations: readonly Location[];
};
const CreateTask: Component<Props> = (props) => {
  const z = useZero();
  const [title, setTitle] = createSignal("");
  const [responsibleID, setResponsibleID] = createSignal(z.userID);
  const [description, setDescription] = createSignal("");
  const [interval, setInterval] = createSignal(timeIntervals["w"].minutes);
  const [locationID, setLocationID] = createSignal(
    props.locations[0]?.id ?? "",
  );

  function handleCreate() {
    const dueDate = dayjs().add(7, "day").toDate();
    const task: Task = {
      id: nanoid(10),
      title: title(),
      responsibleID: responsibleID(),
      dueDate: dueDate.getTime(),
      locationID: locationID(),
      description: description(),
      intervalSeconds: null,
    };
    props.onCreate(task);
    resetState();
  }

  function resetState() {
    setTitle("");
    setResponsibleID(z.userID);
    setLocationID(props.locations[0]?.id ?? "");
    setDescription("");
    setInterval(timeIntervals["w"].minutes);
  }

  return (
    <div class="flex flex-col gap-4">
      <input
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
            <For each={props.users}>
              {(user) => <option value={user.id}>{user.name}</option>}
            </For>
          </select>
        </label>

        <label class="flex-1">
          <span>Location</span>
          <select
            class="select select-bordered w-full"
            onChange={(e) => setLocationID(e.target.value)}
            value={props.locations[0]?.id}
          >
            <For each={props.locations}>
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
        Create task
      </button>
    </div>
  );
};

export default CreateTask;
