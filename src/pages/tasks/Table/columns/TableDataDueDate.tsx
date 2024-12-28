import dayjs from "dayjs";
import { Component, createMemo, Show } from "solid-js";

type Props = {
  due: number;
  last: undefined | number;
};

const TableDataDueDate: Component<Props> = (props) => {
  const dueDateString = createMemo(() => {
    // less than 24h? write "today"
    if (dayjs(props.due).diff(dayjs(), "days") < 1) {
      return "Today";
    }
    let res = dayjs(props.due).fromNow();
    // uppercase first letter; "in 3 days" -> "In 3 days"
    return res.charAt(0).toUpperCase() + res.slice(1);
  });

  return (
    <td>
      <div>
        <p class="capitalize">{dueDateString()}</p>
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
