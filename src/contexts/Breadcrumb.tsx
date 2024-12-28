import { Accessor, createContext, createSignal, useContext } from "solid-js";

type Props = {
  children: any;
};

export type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbContext = {
  crumbs: Accessor<Crumb[]>;
  push: (crumb: Crumb) => void;
  pop: () => void;
  set: (crumbs: Crumb[]) => void;
};

const BreadcrumbContext = createContext();

export function BreadcrumbProvider(props: Props) {
  const [crumbs, setCrumbs] = createSignal<Crumb[]>([]);
  const value: BreadcrumbContext = {
    crumbs: crumbs,
    push: (crumb) => setCrumbs((prev) => [...prev, crumb]),
    pop: () => setCrumbs((prev) => prev.slice(0, -1)),
    set: setCrumbs,
  };

  return (
    <BreadcrumbContext.Provider value={value}>
      {props.children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  return useContext(BreadcrumbContext) as BreadcrumbContext;
}
