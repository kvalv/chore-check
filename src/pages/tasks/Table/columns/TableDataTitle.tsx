import { A } from "@solidjs/router";
import { Component } from "solid-js";

type Props = {
  id: string;
  title: string;
  description: string | null;
};

const TableDataTitle: Component<Props> = (props) => {
  return (
    <td>
      <div class="flex flex-col items-start ">
        <A href={`/tasks/${props.id}`}>{props.title}</A>
        <div
          class="tooltip tooltip-right max-w-[150px]"
          data-tip={props.description}
        >
          <p class="truncate text-xs text-gray-500">{props.description}</p>
        </div>
      </div>
    </td>
  );
};

export default TableDataTitle;
