import { IntervalKey, intervals } from "@/lib/timePeriod";
import { Component, For } from "solid-js";

type Props = {
  value: IntervalKey | undefined;
  onChange: (key: IntervalKey) => void;
};

const PeriodSelect: Component<Props> = (props) => {
  const choices = Object.values(intervals);

  function handleSelect(key: IntervalKey) {
    props.onChange(key);
  }

  return (
    <select
      class="join-item select focus:outline-none select-bordered "
      value={props.value ?? "w"}
      onChange={(e) => handleSelect(e.target.value as IntervalKey)}
    >
      <option disabled selected>
        Period
      </option>
      <For each={choices}>
        {(choice) => <option value={choice.key}>{choice.label}</option>}
      </For>
    </select>
  );
};

export default PeriodSelect;
