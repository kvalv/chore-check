import dayjs from "dayjs";
import { ArrowCounterClockwise } from "phosphor-solid";
import { Component, createMemo, createSignal, For } from "solid-js";
import toast from "solid-toast";
import AreaSelect from "./AreaSelect";
import PeriodSelect from "./PeriodSelect";
import ResponsibleSelect from "./ResponsibleSelect";
import { useZero } from "@/context";
import { useQuery } from "@rocicorp/zero/solid";
import { A } from "@solidjs/router";
import { nanoid } from "nanoid";

type Props = {};

const Table: Component<Props> = () => {
  const z = useZero();

  const [filter, setFilter] = createSignal<{
    responsible: string | undefined;
    withinDays: number | undefined;
    area: string | undefined;
  }>({
    responsible: undefined,
    withinDays: undefined,
    area: undefined,
  });

  function resetFilters() {
    setFilter({
      responsible: undefined,
      withinDays: undefined,
      area: undefined,
    });
  }

  let query = createMemo(() => {
    let query = z.query.task
      .related("responsible")
      .related("location")
      // .related("log", q => q.orderBy("", "desc"))
      .orderBy("dueDate", "asc");
    if (filter().responsible != undefined) {
      query = query.where("responsibleID", "=", filter().responsible!);
    }
    if (filter().withinDays != undefined) {
      const due = dayjs().add(filter().withinDays!, "days").toDate().getTime();
      query = query.where("dueDate", "<=", due);
    }
    if (filter().area != undefined) {
      query = query.where("locationID", "=", filter().area!);
    }
    return query;
  });
  const tasks = useQuery(query);

  function onCompleteTask(taskID: string) {
    const log = {
      id: nanoid(10),
      taskID,
      completedAt: new Date().getTime(),
      completedByID: z.userID,
      completionTimeMinutes: 15,
    };
    z.mutate.log.insert(log);
    console.log({ log });
    toast.success("Task marked as completed ");
  }

  return (
    <div>
      {/* filter section */}
      <div class="flex justify-end items-center w-full shadow-sm">
        <ResponsibleSelect
          value={filter().responsible}
          onChange={(responsible) => {
            setFilter((filter) => ({ ...filter, responsible }));
          }}
        />
        <AreaSelect
          value={filter().area}
          onChange={(area) => {
            setFilter((filter) => ({ ...filter, area }));
          }}
        />
        <PeriodSelect
          value={filter().withinDays}
          onChange={(withinDays) => {
            setFilter((filter) => ({ ...filter, withinDays }));
          }}
        />
        <button class="btn btn-xs btn-ghost " onClick={resetFilters}>
          Reset
          <ArrowCounterClockwise />
        </button>
      </div>

      {/* the table */}
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Job</th>
              <th>Responsible</th>
              <th>Next due date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <For each={tasks()}>
              {(task) => (
                <tr>
                  <td>
                    <div class="flex flex-col items-start ">
                      <A href={`/tasks/${task.id}`}>{task.title}</A>
                      <div
                        class="tooltip max-w-[150px]"
                        data-tip={task.description}
                      >
                        <p class="truncate text-xs text-gray-500">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{task.responsible[0].name}</td>
                  <td>{dayjs(task.dueDate).get("days")} days</td>
                  <td>
                    {/* a button to check of it's done */}
                    <button
                      onClick={() => onCompleteTask(task.id)}
                      class="btn btn-outline btn-xs "
                    >
                      Complete
                    </button>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
