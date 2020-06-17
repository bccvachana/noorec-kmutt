import moment from "moment";
import "moment/locale/th";
moment.locale("th");

export const parseTime = (time) => {
  const temp1 = moment.unix(time).format("D MMMM");
  const year = moment.unix(time).format("YYYY");
  const temp2 = moment.unix(time).format("H:mm น.");
  return `${temp1} ${parseInt(year) + 543} ${temp2}`;
};

export const fromNow = (time) => {
  const parseTime = moment.unix(time);
  const dayDiff = moment().diff(parseTime, "days");
  if (dayDiff === 0) return parseTime.fromNow();
  else if (dayDiff === 1)
    return `เมื่อวานนี้ เวลา ${parseTime.format("H:mm น.")}`;
  else if (parseTime.format("YYYY") !== moment().format("YYYY")) {
    return `${parseTime.format("D MMMM")} ${
      parseInt(parseTime.format("YYYY")) + 543
    }`;
  } else
    return `${parseTime.format("D MMMM")} เวลา ${parseTime.format("H:mm น.")}`;
};

export const chatTime = (time) => {
  const parseTime = moment.unix(time);
  const dayDiff = moment().diff(parseTime, "days");
  if (dayDiff === 0) return parseTime.format("LT");
  else return parseTime.format("D MMM H:mm");
};
