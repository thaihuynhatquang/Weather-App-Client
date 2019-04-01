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
    daysOfWeek: daysOfWeek[datetime.getUTCDay()],
    day: datetime.getUTCDate(),
    month: monthNames[datetime.getUTCMonth()],
    year: datetime.getFullYear(),
    fullDate:
      datetime.getUTCDate() +
      " " +
      monthNames[datetime.getUTCMonth()] +
      " " +
      datetime.getUTCFullYear()
  };
};

export const analysisData = forecastWeather => {
  const groupByDate = _.forEach(
    _.groupBy(forecastWeather, item => item.dt_txt.slice(0, 10)),
    i => {
      _.forEach(i, j => {
        j.datetime = convertEpochTime(j.dt);
        j.datetime.hour = j.dt_txt.slice(11, 16);
        j.weather[0].description = _.startCase(j.weather[0].description);
      });
    }
  );
  return Object.values(groupByDate);
};
