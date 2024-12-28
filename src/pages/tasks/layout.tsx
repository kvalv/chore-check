import { useZero } from "@/context";
import { useBreadcrumb } from "@/contexts/Breadcrumb";
import { useQuery } from "@rocicorp/zero/solid";
import { RouteSectionProps, useParams } from "@solidjs/router";
import { Component, createEffect } from "solid-js";

const TasksLayout: Component<RouteSectionProps> = (props) => {
  const z = useZero();
  // const id = useParams().id ?? "xx";
  const params = useParams();
  const taskQuery = useQuery(() =>
    z.query.task.one().where("id", params.id ?? "xx"),
  );

  const bread = useBreadcrumb();
  createEffect(() => {
    const title = taskQuery()?.title;
    if (title) {
      bread.set([
        { label: "Home", href: "/" },
        { label: "Tasks", href: "/tasks" },
        { label: title, href: `/tasks/${params.id}` },
      ]);
    } else {
      bread.set([
        { label: "Home", href: "/" },
        { label: "Tasks", href: "/tasks" },
      ]);
    }
  });

  return props.children;
};

export default TasksLayout;
