import { useZero } from "@/context";
import { Log } from "@/schema";
import { useQuery } from "@rocicorp/zero/solid";
import { nanoid } from "nanoid";
import { Component, createEffect, createSignal, Index } from "solid-js";

type Props = {
  open: boolean;
  taskID: string;
  onClose: () => void;
  onSubmit: (log: Log) => void;
};

const CompleteTaskModal: Component<Props> = (props) => {
  const z = useZero();
  // we want to know the title, so we do a query to fetch the task
  const task = useQuery(() => z.query.task.where("id", "=", props.taskID));

  const [completionTime, setCompletionTime] = createSignal(15);
  const [comment, setComment] = createSignal<string | null>(null);

  // this effect manages the lifecycle of our modal;
  // when it gets closed, we want to reset the state.
  createEffect(() => {
    if (props.open) {
      modal?.showModal();
    } else {
      modal?.close();
      // reset too
      setCompletionTime(15);
      setComment(null);
    }
  });

  let modal: HTMLDialogElement | undefined = undefined;
  let box: HTMLDivElement | undefined = undefined;

  function handleSubmit() {
    props.onSubmit({
      id: nanoid(10),
      taskID: props.taskID,
      completedAt: new Date().getTime(),
      completedByID: z.userID,
      completionTimeMinutes: completionTime(),
      comment: comment(),
    });
  }

  function closeIfClickOutsideModalBox(e: MouseEvent) {
    if (!box?.contains(e.target as Node) && modal?.open) props.onClose();
  }

  return (
    <dialog onClick={closeIfClickOutsideModalBox} ref={modal} class="modal">
      <div class="max-lg:w-full modal-box" ref={box}>
        <div>
          <h3 class="text-lg font-bold">Complete task</h3>
          <h3 class="text-sm text-gray-500 font-normal">{task()[0]?.title}</h3>
        </div>
        {/* body */}
        <div class="flex flex-col pt-2 gap-3">
          <TimeSpentRange
            min={0}
            step={15}
            max={120}
            value={completionTime()}
            onChange={setCompletionTime}
          />

          {/* optional comment */}
          <label class="form-control">
            <div class="label">
              <span class="label-text">Comments (optional)</span>
            </div>
            <textarea
              class="textarea textarea-bordered h-24"
              value={comment() ?? ""}
              onInput={(e) => setComment(e.currentTarget.value)}
              placeholder="Jeg chonket mye..."
            ></textarea>
          </label>
        </div>

        <form method="dialog" onSubmit={() => props.onClose()}>
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <div class="modal-action">
          <button onClick={handleSubmit} class="btn">
            Submit
          </button>
        </div>
      </div>
    </dialog>
  );
};

type TimeSpentProps = {
  value: number;
  onChange: (value: number) => void;
  min: number;
  step: number;
  max: number;
};
const TimeSpentRange: Component<TimeSpentProps> = (props) => {
  if (props.step == 0) {
    throw new Error("step must be greater than 0");
  }
  if (props.max % props.step != 0) {
    throw new Error("max must be a multiple of step");
  }

  const steps = props.max / props.step;

  return (
    <label class="form-control ">
      <div class="label">
        <span class="label-text">Time spent (estimated)</span>
      </div>
      <div class="px-4">
        <input
          type="range"
          min={props.min}
          max={props.max}
          value={props.value}
          onInput={(e) => props.onChange(parseInt(e.currentTarget.value))}
          class="range range-xs"
          step={props.step}
        />
      </div>
      <div class="flex w-full font-mono  text-xs text-center">
        <Index each={Array.from({ length: steps + 1 })}>
          {(_, index) => <span class="flex-1 ">{index * props.step}m</span>}
        </Index>
      </div>
    </label>
  );
};

export default CompleteTaskModal;
