import dayjs from "dayjs";

export const generateScheduleDates = (startDate: dayjs.Dayjs) => {
  const startLive = startDate;
  const endLive = startLive.add(19, "day");
  const startOff = endLive.add(1, "day");
  const endOff = startOff.add(9, "day");

  return { startLive, endLive, startOff, endOff };
};