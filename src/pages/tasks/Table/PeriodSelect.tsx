import { Component, For } from "solid-js";

type Props = {
  value: number | undefined;
  onChange: (days: number | undefined) => void;
};

const PeriodSelect: Component<Props> = (props) => {
  // 1 week, 2 weeks, 1 month, 6 months
  const choices = [
    { label: "1 week", value: 7 },
    { label: "2 weeks", value: 14 },
    { label: "1 month", value: 30 },
    { label: "6 months", value: 180 },
  ];

  function handleSelect(days: number) {
    if (days === -1) {
      return props.onChange(undefined);
    } else {
      props.onChange(days);
    }
  }

  return (
    <select
      class="select focus:outline-none select-ghost max-w-xs "
      value={props.value ?? -1}
      onChange={(e) => handleSelect(parseInt(e.target.value))}
    >
      <option selected value="-1">
        All dates
      </option>
      <For each={choices}>
        {(choice) => <option value={choice.value}>{choice.label}</option>}
      </For>
    </select>
  );
};

export default PeriodSelect;
