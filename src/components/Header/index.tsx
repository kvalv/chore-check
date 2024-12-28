import { Component, Show } from "solid-js";
import { useQuery } from "@rocicorp/zero/solid";
import Cookies from "js-cookie";
import { Schema } from "@/schema";
import { Zero } from "@rocicorp/zero";
import Breadcrumbs from "./Breadcrumbs";

type Props = {
  z: Zero<Schema>;
};

const Header: Component<Props> = ({ z }) => {
  const login = async () => {
    await fetch("/api/login");
    location.reload();
  };
  const logout = async () => {
    Cookies.remove("jwt");
    location.reload();
  };

  const loggedInUser = useQuery(() => z.query.user.where("id", z.userID).one());

  return (
    <div
      class="bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] 
  shadow-sm p-4 justify-between "
    >
      <Show when={loggedInUser()} fallback={<div></div>}>
        <Breadcrumbs />
        <button onClick={logout}>Log out</button>
      </Show>
      <Show when={!loggedInUser()}>
        <button onClick={login}>Log in</button>
      </Show>
    </div>
  );
};

export default Header;
