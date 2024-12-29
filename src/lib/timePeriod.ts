import dayjs from "dayjs";

export const intervals = {
  w: {
    label: "This week",
    key: "w",
    range: () => {
      const start = dayjs().startOf("week");
      const end = dayjs().endOf("week");
      return { start, end };
    },
  },
  nw: {
    label: "Next week",
    key: "nw",
    range: () => {
      const start = dayjs().startOf("week").add(1, "week").add(1, "day");
      const end = dayjs().endOf("week").add(1, "week").add(1, "day");
      return { start, end };
    },
  },
  m: {
    label: "This month",
    key: "m",
    range: () => {
      const start = dayjs().startOf("month").add(1, "day");
      const end = dayjs().endOf("month").add(1, "day");
      return { start, end };
    },
  },
  nm: {
    label: "Next month",
    key: "nm",
    range: () => {
      const start = dayjs().startOf("month").add(1, "month").add(1, "day");
      const end = dayjs().endOf("month").add(1, "month").add(1, "day");
      return { start, end };
    },
  },
  n6m: {
    label: "6 months",
    key: "n6m",
    range: () => {
      const start = dayjs().startOf("month").add(1, "day");
      const end = dayjs().endOf("month").add(6, "month").add(1, "day");
      return { start, end };
    },
  },
  all: {
    label: "All",
    key: "all",
    range: () => {
      const start = dayjs("2000-01-01");
      const end = dayjs("2030-01-01"); // 🤷
      return { start, end };
    },
  },
} as const;

export type TimePeriod = { start: dayjs.Dayjs; end: dayjs.Dayjs };
export type IntervalKey = keyof typeof intervals;

export function getTimePeriod(key: IntervalKey): TimePeriod {
  const data = intervals[key];
  if (!data) {
    return getTimePeriod("w"); // fallback
  }
  return data.range();
}
