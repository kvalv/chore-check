import { Zero } from "@rocicorp/zero";
import { createContext, useContext } from "solid-js";
import { Schema } from "./schema";

type Props = {
  z: Zero<Schema>;
  children: any;
};

const ZeroContext = createContext();

export function ZeroProvider(props: Props) {
  return (
    <ZeroContext.Provider value={props.z}>
      {props.children}
    </ZeroContext.Provider>
  );
}

export function useZero() {
  return useContext(ZeroContext) as Zero<Schema>;
}
