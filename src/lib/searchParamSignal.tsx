import { useSearchParams } from "@solidjs/router";
import { Accessor, createSignal, Setter } from "solid-js";

export function createSearchParamSignal<T>(key: string, initial?: T) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [value, setValue] = createSignal(searchParams[key] ?? initial);

  const update = (v: T) => {
    setValue(v as any);
    setSearchParams({ [key]: v as any });
  };

  return [value, update] as [Accessor<T>, Setter<T>];
}
