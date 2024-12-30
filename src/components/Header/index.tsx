import { Component, Show } from "solid-js";
import { useQuery } from "@rocicorp/zero/solid";
import Cookies from "js-cookie";
import Breadcrumbs from "./Breadcrumbs";
import { useZero } from "@/context";
import { SignOut } from "phosphor-solid";
import Avatar from "../Avatar";

const Header: Component<{}> = () => {
  const z = useZero();
  const login = async () => {
    await fetch("/api/login");
    location.reload();
  };
  const logout = async (e: MouseEvent) => {
    e.preventDefault();
    Cookies.remove("jwt");
    location.reload();
  };

  const loggedInUser = useQuery(() => z.query.user.where("id", z.userID).one());

  return (
    <div
      class="bg-base-200 text-base-content sticky top-0 z-30 flex w-full bg-opacity-80 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] 
  shadow-sm p-4 justify-between "
    >
      <Show when={loggedInUser()} fallback={<div></div>}>
        <Breadcrumbs />

        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn m-1">
            <Avatar url={loggedInUser()?.avatar} />
          </div>
          <ul
            tabindex="0"
            class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li class="">
              <a onClick={logout}>
                <SignOut />
                Log out
              </a>
            </li>
          </ul>
        </div>
      </Show>
      <Show when={!loggedInUser()}>
        <button onClick={login}>Log in</button>
      </Show>
    </div>
  );
};

export default Header;
