var _ = require("lodash");

export const convertEpochTime = epochTime => {
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var datetime = new Date(epochTime * 1000);
  return {
    daysOfWeek: daysOfWeek[datetime.getDay()],
    day: datetime.getDate(),
    month: monthNames[datetime.getMonth()],
    year: datetime.getFullYear(),
    hour: datetime.getUTCHours(),
    minute: datetime.getMinutes(),
    second: datetime.getSeconds(),
    fullDate:
      datetime.getDate() +
      " " +
      monthNames[datetime.getMonth()] +
      " " +
      datetime.getFullYear()
  };
};

export const analysisData = forecastWeather => {
  const groupByDate = _.forEach(
    _.groupBy(forecastWeather, item => item.dt_txt.slice(0, 10)),
    i => {
      _.forEach(i, j => {
        j.datetime = convertEpochTime(j.dt);
        j.weather[0].description = _.startCase(j.weather[0].description);
      });
    }
  );
  return Object.values(groupByDate);
};
