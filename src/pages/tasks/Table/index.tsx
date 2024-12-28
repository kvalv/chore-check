import dayjs from "dayjs";
import { ArrowCounterClockwise } from "phosphor-solid";
import { Component, createMemo, createSignal, For, Show } from "solid-js";
import toast from "solid-toast";
import AreaSelect from "./AreaSelect";
import PeriodSelect from "./PeriodSelect";
import ResponsibleSelect from "./ResponsibleSelect";
import { useZero } from "@/context";
import { useQuery } from "@rocicorp/zero/solid";
import { nanoid } from "nanoid";
import TableDataDueDate from "./columns/TableDataDueDate";
import TableDataTitle from "./columns/TableDataTitle";
import { Task } from "@/schema";

type Props = {
  onComplete: (taskID: string) => void;
};

const Table: Component<Props> = (props) => {
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
      .related("log", (q) => q.orderBy("completedByID", "desc").limit(1))
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
      <div class="overflow-x-auto shadow-sm">
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
                  <TableDataTitle {...task} />
                  <td>{task.responsible[0].name}</td>
                  <TableDataDueDate
                    due={task.dueDate}
                    last={task.log[0]?.completedAt}
                  />
                  <td>
                    {/* a button to check of it's done */}
                    <button
                      onClick={() => props.onComplete(task.id)}
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
