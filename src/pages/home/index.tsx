import { Component } from "solid-js";
import { RocketLaunch } from "phosphor-solid";
import { A } from "@solidjs/router";

type Props = {};

const Home: Component<Props> = (props) => {
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
  return (
    <A href="/tasks" class="stat">
      <div class="stat-figure text-primary">
        <RocketLaunch size={40} />
      </div>
      <div class="stat-title">Completed tasks </div>
      <div class="stat-value">
        {props.completed} / {props.total}
      </div>
      <div class="stat-desc">Jan 1st - Feb 1st</div>
    </A>
  );
};

export default Home;
