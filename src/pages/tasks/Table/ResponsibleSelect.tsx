import { useZero } from "@/context";
import { useQuery } from "@rocicorp/zero/solid";
import { Component, For } from "solid-js";

type Props = {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
};

const ResponsibleSelect: Component<Props> = (props) => {
  const z = useZero();

  const choices = useQuery(() => z.query.user);

  function handleSelect(responsible: string) {
    if (responsible === "all") {
      props.onChange(undefined);
    } else {
      props.onChange(responsible);
    }
  }

  return (
    <select
      class="select focus:outline-none select-ghost max-w-xs "
      onChange={(e) => handleSelect(e.currentTarget.value)}
      value={props.value ?? "all"}
    >
      <option value="all">Anyone</option>
      <For each={choices()}>
        {(choice) => <option value={choice.id}>{choice.name}</option>}
      </For>
    </select>
  );
};

export default ResponsibleSelect;
