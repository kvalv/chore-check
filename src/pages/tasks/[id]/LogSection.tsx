import { useZero } from "@/context";
import { Log, User } from "@/schema";
import { useQuery } from "@rocicorp/zero/solid";
import { useParams } from "@solidjs/router";
import dayjs from "dayjs";
import { CalendarBlank, Timer } from "phosphor-solid";
import { Component } from "solid-js";

type LogEntryProps = {
  log: Log;
  by?: User;
};

const LogEntry: Component<LogEntryProps> = (props) => {
  return (
    <div class="flex flex-col gap-2 items-start shadow-sm p-4 border border-base-200 rounded-sm ">
      {/* top section */}
      <div class="flex items-center w-full justify-between ">
        <div class="flex gap-1 items-center text-gray-500">
          <CalendarBlank />
          {dayjs(props.log.completedAt).format("D MMM YYYY")}
        </div>

        <div class="badge badge-md  badge-outline">
          <Timer />
          {`${props.log.completionTimeMinutes}m`}
        </div>
      </div>

      <div class="text-sm">{props.by?.name}</div>
      <textarea class="textarea textarea-bordered w-[75%]" readonly>
        {props.log.comment}
      </textarea>
    </div>
  );
};

const LogSection: Component = () => {
  const id = useParams().id;
  const z = useZero();
  const logs = useQuery(() =>
    z.query.log
      .related("completedBy")
      .where("taskID", id)
      .orderBy("completedAt", "desc"),
  );

  return (
    <div class="flex flex-col gap-2 ">
      <div class="text-lg">Log</div>
      <div class="flex flex-col gap-4 ">
        {logs().map((log) => (
          <LogEntry log={log} by={log.completedBy[0]} />
        ))}
      </div>
    </div>
  );
};

export default LogSection;
