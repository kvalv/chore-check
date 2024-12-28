/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import relativeTime from "dayjs/plugin/relativeTime";

import dayjs from "dayjs";
import Router from "./Router.tsx";

const root = document.getElementById("root");

dayjs.extend(relativeTime);

render(() => <Router />, root!);
