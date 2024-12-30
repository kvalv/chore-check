import { Component } from "solid-js";

type Props = {
  url: string | undefined;
  class?: string;
};

const Avatar: Component<Props> = (props) => {
  return (
    <div class={`avatar ${props.class ?? ""}`}>
      <div class="w-[24px] rounded-full">
        <img src={props.url} />
      </div>
    </div>
  );
};

export default Avatar;
