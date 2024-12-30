const day = 24 * 60 * 60 * 1000;
export const timeIntervals = {
  w: {
    label: "Weekly",
    key: "w",
    seconds: 7 * day,
  },
  biw: {
    label: "Bi-weekly",
    key: "biw",
    seconds: 14 * day,
  },
  m: {
    label: "Monthly",
    key: "m",
    seconds: 30 * day,
  },
  q: {
    label: "Quarterly",
    key: "q",
    seconds: 90 * day,
  },
  y: {
    label: "Yearly",
    key: "y",
    seconds: 365 * day,
  },
} as const;
