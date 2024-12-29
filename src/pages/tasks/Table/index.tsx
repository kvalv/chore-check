import { ArrowCounterClockwise } from "phosphor-solid";
import { Component, createMemo, For } from "solid-js";
import PeriodSelect from "./PeriodSelect";
import { getTimePeriod, IntervalKey } from "@/lib/timePeriod";
import ResponsibleSelect from "./ResponsibleSelect";
import { useZero } from "@/context";
import { useQuery } from "@rocicorp/zero/solid";
import TableDataDueDate from "./columns/TableDataDueDate";
import TableDataTitle from "./columns/TableDataTitle";
import { createSearchParamSignal } from "@/lib/searchParamSignal";
import { A } from "@solidjs/router";

type Props = {
  onComplete: (taskID: string) => void;
};

const Table: Component<Props> = (props) => {
  const z = useZero();

  // filters
  const [responsible, setResponsible] = createSearchParamSignal("r", "");
  const [period, setPeriod] = createSearchParamSignal<IntervalKey>("p", "w");

  function resetFilters() {
    setResponsible("");
    setPeriod("w");
  }

  let query = createMemo(() => {
    let query = z.query.task
      .related("responsible")
      .related("location")
      .related("log", (q) => q.orderBy("completedByID", "desc").limit(1))
      .orderBy("dueDate", "asc");
    if (responsible() != "") {
      query = query.where("responsibleID", "=", responsible()!);
    }
    if (period() != undefined) {
      const { start, end } = getTimePeriod(period());
      query = query
        .where("dueDate", ">=", start.valueOf())
        .where("dueDate", "<=", end.valueOf());
    }
    return query;
  });
  const tasks = useQuery(query);

  return (
    <div class="flex flex-col gap-4">
      {/* header section */}
      <div class="flex justify-between items-center">
        <A href="./create">
          <button class="btn btn-neutral ">Create</button>
        </A>

        {/* filter section */}
        <div class="join">
          <ResponsibleSelect
            value={responsible()}
            onChange={(responsible) => {
              setResponsible(responsible ?? "");
            }}
          />
          <PeriodSelect
            value={period()}
            onChange={(withinDays) => {
              setPeriod(withinDays);
            }}
          />
          <button class="btn rounded-r-full join-item" onClick={resetFilters}>
            Reset
            <ArrowCounterClockwise />
          </button>
        </div>
      </div>

      {/* the table */}
      <div class="h-full shadow-sm">
        <table class="table">
          <thead>
            <tr>
              <th>Job</th>
              <th>Responsible</th>
              <th>Due</th>
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
