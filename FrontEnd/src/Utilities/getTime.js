const getTimeFrom = (time) => {
  const timeDifference = Date.now() - new Date(time);
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;
  const times = [
    { label: "year", value: year },
    { label: "month", value: month },
    { label: "week", value: week },
    { label: "day", value: day },
    { label: "hour", value: hour },
    { label: "minute", value: minute },
    { label: "second", value: second },
  ];
  const el = times.find((el, i) => el.value <= timeDifference);
  if (!el) return "now";
  const count = Math.floor(timeDifference / el.value);
  return `${count} ${el.label}${count > 1 ? "s" : ""}`;
};
export default getTimeFrom;
