import { Component } from "solid-js";

type Props = {
  src: string | undefined;
  class?: string;
};

const Avatar: Component<Props> = (props) => {
  return (
    <div class={`avatar w-[24px] ${props.class ?? ""}`}>
      <div class={`rounded-full`}>
        <img src={props.src} />
      </div>
    </div>
  );
};

export default Avatar;
