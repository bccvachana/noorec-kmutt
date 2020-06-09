import moment from "moment";
import "moment/locale/th";
moment.locale("th");

export const parseTime = (time) => {
  const temp1 = moment.unix(time).format("D MMMM ");
  let year = moment.unix(time).format("YYYY");
  const temp2 = moment.unix(time).format(" H:mm น.");
  return temp1 + (parseInt(year) + 543) + temp2;
};
