import { Log, User } from "@/schema";
import { Collapse } from "solid-collapse";
import dayjs from "dayjs";
import { CalendarBlank, CaretDown, Timer } from "phosphor-solid";
import { Component, createSignal, Show } from "solid-js";

type Props = {
  log: Log;
  by?: User;
};

const LogRecord: Component<Props> = (props) => {
  const [open, setOpen] = createSignal(false);

  return (
    <div class="flex flex-col w-full rounded-md px-2">
      <div class="flex items-center justify-between">
        <div class="flex gap-1 items-center text-xs ">
          <CalendarBlank class="w-[16px] mr-1" />
          {dayjs(props.log.completedAt).format("MMM DD, YYYY")}
        </div>

        <Show when={props.log.completionTimeMinutes > 0}>
          <div class="badge badge-md  badge-outline">
            <Timer />
            {`${props.log.completionTimeMinutes}m`}
          </div>
        </Show>

        <Show when={props.log.comment != null}>
          <button
            class="btn btn-square transition btn-ghost"
            classList={{ "rotate-180": open() }}
            // classList={{ "rotate-180": open() }}
            onClick={() => setOpen((old) => !old)}
          >
            <CaretDown />
          </button>
        </Show>
      </div>
      <Collapse
        class="flex items-start transition-all duration-300 ease-in-out "
        value={open()}
      >
        <div class="border-l-2 border-gray-200 pl-2 py-1/2">
          <p class="text-gray-500 text-sm">{props.log.comment}</p>
        </div>
      </Collapse>
    </div>
  );
};

export default LogRecord;
