import { Component } from "solid-js";
import { RocketLaunch } from "phosphor-solid";
import { A } from "@solidjs/router";
import { useZero } from "@/context";
import { getTimePeriod } from "@/lib/timePeriod";

type Props = {};

const Home: Component<Props> = () => {
  return (
    <div class="stats shadow">
      <WorkLeftStatCard completed={4} total={12} />
    </div>
  );
};

type WorkLeftStatCardProps = {
  completed: number;
  total: number;
};
const WorkLeftStatCard: Component<WorkLeftStatCardProps> = (props) => {
  const z = useZero();
  let params = new URLSearchParams();
  params.append("p", "w"); // period: this week..
  params.append("r", z.userID); // filter on me

  const { start, end } = getTimePeriod("w");

  return (
    <A href={"/tasks?" + params.toString()} class="stat">
      <div class="stat-figure text-primary">
        <RocketLaunch size={40} />
      </div>
      <div class="stat-title">Completed tasks </div>
      <div class="stat-value">
        {props.completed} / {props.total}
      </div>
      <div class="stat-desc">
        {start.format("MMM Do")} - {end.format("MMM Do")}
      </div>
    </A>
  );
};

export default Home;
