import { useZero } from "@/context";
import { useQuery } from "@rocicorp/zero/solid";
import { useParams } from "@solidjs/router";
import dayjs from "dayjs";
import { Component } from "solid-js";

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
      <div class="flex flex-col gap-1">
        {logs().map((log) => (
          <div class="flex flex-col gap-1 items-start">
            <div>Completed by: {log.completedBy[0].name}</div>
            <div>{dayjs(log.completedAt).format("MMM D, YYYY")}</div>
            <div>{log.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogSection;
