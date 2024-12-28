import { useQuery } from "@rocicorp/zero/solid";
import { Component, Show } from "solid-js";
import Header from "@/components/Header";

import { schema } from "./schema.ts";
import { createZero } from "@rocicorp/zero/solid";
import Cookies from "js-cookie";
import { decodeJwt } from "jose";
import { ZeroProvider } from "./context.tsx";
import { RouteSectionProps } from "@solidjs/router";
import { BreadcrumbProvider } from "./contexts/Breadcrumb.tsx";
import { Toaster } from "solid-toast";
const encodedJWT = Cookies.get("jwt");
const decodedJWT = encodedJWT && decodeJwt(encodedJWT);
const userID = decodedJWT?.sub ? (decodedJWT.sub as string) : "anon";

const App: Component<RouteSectionProps> = (props) => {
  const z = createZero({
    userID,
    auth: () => encodedJWT,
    server: import.meta.env.VITE_PUBLIC_SERVER,
    schema,
    // This is easier to develop with until we make the persistent state
    // delete itself on schema changes. Just remove to get persistent storage.
    kvStore: "mem",
  });

  // function App({ z }: { z: Zero<Schema> }) {
  const users = useQuery(() => z.query.user);

  // If initial sync hasn't completed, these can be empty.
  const initialSyncComplete = () => users().length;

  return (
    <ZeroProvider z={z}>
      <BreadcrumbProvider>
        <Show when={initialSyncComplete()}>
          <Header z={z} />
          {props.children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "text-sm",
              iconTheme: {
                primary: "oklch(var(--su))",
                secondary: "#fff",
              },
            }}
          />
        </Show>
      </BreadcrumbProvider>
    </ZeroProvider>
  );
};

export default App;
