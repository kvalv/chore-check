import { Component, createSignal, For } from "solid-js";
import { User, Location, Task } from "@/schema";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

type Props = {
  onCreate: (task: Task) => void;
  users: readonly User[];
  locations: readonly Location[];
  currentUserId: string;
};
const CreateTask: Component<Props> = (props) => {
  const [title, setTitle] = createSignal("");
  const [responsibleID, setResponsibleID] = createSignal(props.currentUserId);
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
    };
    props.onCreate(task);
    // reset state
    setTitle("");
    setResponsibleID(props.currentUserId);
    setLocationID(props.locations[0]?.id ?? "");
  }

  return (
    <div class="flex flex-col gap-2">
      <input
        placeholder="title"
        class="w-full p-2 border border-gray-300 rounded"
        onChange={(e) => setTitle(e.target.value)}
      />

      <label class="p-2">
        <select
          class="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setResponsibleID(e.target.value)}
          value={responsibleID()}
        >
          <For each={props.users}>
            {(user) => <option value={user.id}>{user.name}</option>}
          </For>
        </select>
        <span>Responsible</span>
      </label>

      <label class="p-2">
        <select
          class="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setLocationID(e.target.value)}
          value={responsibleID()}
        >
          <For each={props.locations}>
            {(loc) => <option value={loc.id}>{loc.name}</option>}
          </For>
        </select>
        <span>Location</span>
      </label>

      <button class="bg-blue-500 text-white p-2 rounded" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
};

export default CreateTask;
