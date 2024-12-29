/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import Router from "./Router.tsx";

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

// by default, english locale has sunday as the first day. we override that
dayjs.updateLocale("en", {
  weekStart: 1,
});

const root = document.getElementById("root");

render(() => <Router />, root!);
