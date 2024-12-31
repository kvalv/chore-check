import LogRecord from "@/components/LogRecord";
import { useZero } from "@/context";
import { useQuery } from "@rocicorp/zero/solid";
import { useParams } from "@solidjs/router";
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
      <div class="flex flex-col gap-4 ">
        {logs().map((log) => (
          <LogRecord log={log} by={log.completedBy[0]} />
        ))}
      </div>
    </div>
  );
};

export default LogSection;
