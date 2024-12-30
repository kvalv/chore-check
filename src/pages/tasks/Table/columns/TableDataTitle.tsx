import Avatar from "@/components/Avatar";
import { User } from "@/schema";
import { A } from "@solidjs/router";
import { Component } from "solid-js";

type Props = {
  id: string;
  title: string;
  responsible: User;
  description: string | null;
};

const TableDataTitle: Component<Props> = (props) => {
  const firstName = props.responsible.name.split(" ")[0];
  return (
    <td>
      <div class="flex flex-col gap-1 ">
        <A href={`/tasks/${props.id}`}>{props.title}</A>

        <div class="flex items-center gap-1">
          <Avatar class="w-[16px]" src={props.responsible.avatar} />
          <span class="text-gray-500 text-xs">{firstName}</span>
        </div>
      </div>
    </td>
  );
};

export default TableDataTitle;
