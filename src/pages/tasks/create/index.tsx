import { useQuery } from "@rocicorp/zero/solid";
import { useZero } from "../../../context";
import CreateTask from "./CreateTask";
import { Component } from "solid-js";
import { useBreadcrumb } from "@/contexts/Breadcrumb";

const TasksCreate: Component = () => {
  const z = useZero();
  const users = useQuery(() => z.query.user);
  const locations = useQuery(() => z.query.location);
  useBreadcrumb().set([
    { label: "Home", href: "/" },
    { label: "Tasks", href: "/tasks" },
    { label: "New task" },
  ]);

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
