const day = 24 * 60;
export const timeIntervals = {
  w: {
    label: "Weekly",
    key: "w",
    minutes: 7 * day,
  },
  biw: {
    label: "Bi-weekly",
    key: "biw",
    minutes: 14 * day,
  },
  m: {
    label: "Monthly",
    key: "m",
    minutes: 30 * day,
  },
  q: {
    label: "Quarterly",
    key: "q",
    minutes: 90 * day,
  },
  y: {
    label: "Yearly",
    key: "y",
    minutes: 365 * day,
  },
} as const;
