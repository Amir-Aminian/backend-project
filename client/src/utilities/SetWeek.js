const SetWeek = (d) => {
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

  const days =["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday", "Sunday"];

  let year;

  let month;

  let weekDays=[];

  let date = d.getDate()+1;

  let day = d.getDay();

  let startIndex = date-day;

  let endIndex = startIndex+6;

  let startDate = new Date(d.setDate(startIndex));

  let endDate = new Date(new Date(d).setDate(endIndex));

  if (startDate.getFullYear()!=endDate.getFullYear()) {
      year = startDate.getFullYear()+"-"+endDate.getFullYear();
  } else {
      year = d.getFullYear();
  };

  if (months[startDate.getMonth()]!=months[endDate.getMonth()]) {
      month = months[startDate.getMonth()]+" - "+months[endDate.getMonth()];
  } else {
      month = months[d.getMonth()];
  };

  for (let i = startIndex; i <= endIndex; i++) {
      let weekDate = new Date(d);
      let month = months[new Date(weekDate.setDate(i)).getMonth()];
      weekDays.push({weekDate: new Date(weekDate.setDate(i)).getDate(), weekDay: days[i-startIndex], weekMonth: month, monthNumber: new Date(weekDate.setDate(i)).getMonth(), yearNumber: new Date(weekDate.setDate(i)).getFullYear()});
  };
  
  return({year: year, month: month, weekDays: weekDays});
}

export default SetWeek;
