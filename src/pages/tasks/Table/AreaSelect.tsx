import { useZero } from "@/context";
import { useQuery } from "@rocicorp/zero/solid";
import { Component, For } from "solid-js";

type Props = {
  value: string | undefined;
  onChange: (area: string | undefined) => void;
};

const AreaSelect: Component<Props> = (props) => {
  const z = useZero();

  const choices = useQuery(() => z.query.location);

  function handleSelect(location: string) {
    if (location === "all") {
      return props.onChange(undefined);
    } else {
      props.onChange(location);
    }
  }

  return (
    <select
      class="join-item select focus:outline-none select-bordered "
      onChange={(e) => handleSelect(e.currentTarget.value)}
      value={props.value ?? "all"}
    >
      <option selected value="all">
        All areas
      </option>
      <For each={choices()}>
        {(choice) => <option value={choice.id}>{choice.name}</option>}
      </For>
    </select>
  );
};

export default AreaSelect;
