import { useQuery } from "@rocicorp/zero/solid";
import { useZero } from "../../../context";
import CreateTask from "./CreateTask";
import { Component } from "solid-js";

const TasksCreate: Component = () => {
  const z = useZero();
  const users = useQuery(() => z.query.user);
  const locations = useQuery(() => z.query.location);

  return (
    <div>
      <CreateTask
        locations={locations()}
        currentUserId={z.userID}
        users={users()}
        onCreate={(task) => {
          z.mutate.task.insert(task);
        }}
      />
    </div>
  );
};
export default TasksCreate;
