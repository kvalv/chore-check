import dayjs from "dayjs";
import { Component, Show } from "solid-js";

type Props = {
  due: number;
  last: undefined | number;
};

const TableDataDueDate: Component<Props> = (props) => {
  return (
    <td>
      <div>
        <p>{`In ${dayjs(props.due).get("days")} days`}</p>
        <Show
          when={props.last != undefined}
          fallback={<p class="text-xs text-gray-500">Never done</p>}
        >
          <p class="text-xs text-gray-500">
            {`Last: ${dayjs(props.last!).fromNow()}`}
          </p>
        </Show>
      </div>
    </td>
  );
};

export default TableDataDueDate;
