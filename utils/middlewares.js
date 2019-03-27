export const convertEpochTime = (epochTime) => {
  var monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
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
    second: datetime.getSeconds()
  }
}
