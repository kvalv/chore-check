import { useBreadcrumb } from "@/contexts/Breadcrumb";
import { A } from "@solidjs/router";
import { Component, For, Show } from "solid-js";

const Breadcrumbs: Component<{}> = () => {
  const bread = useBreadcrumb();
  return (
    <div class="breadcrumbs text-sm">
      <ul>
        <For each={bread.crumbs()}>
          {(crumb) => (
            <li>
              <Show
                when={crumb.href != undefined}
                fallback={<span>{crumb.label}</span>}
              >
                <A href={crumb.href!}>{crumb.label}</A>
              </Show>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};
export default Breadcrumbs;
