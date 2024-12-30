import { useQuery } from "@rocicorp/zero/solid";
import { useZero } from "../../../context";
import CreateTask from "./CreateTask";
import { Component } from "solid-js";
import { useBreadcrumb } from "@/contexts/Breadcrumb";
import { useNavigate } from "@solidjs/router";

const TasksCreate: Component = () => {
  const z = useZero();
  const users = useQuery(() => z.query.user);
  const locations = useQuery(() => z.query.location);
  const navigate = useNavigate();
  useBreadcrumb().set([
    { label: "Home", href: "/" },
    { label: "Tasks", href: "/tasks" },
    { label: "New task" },
  ]);

  return (
    <div>
      <CreateTask
        locations={locations()}
        users={users()}
        onCreate={async (task) => {
          await z.mutate.task.insert(task);
          navigate(`/tasks/${task.id}`);
        }}
      />
    </div>
  );
};
export default TasksCreate;
