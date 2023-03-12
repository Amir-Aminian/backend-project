const TimeLimit = (startTime, endTime) => {
  const splitedStartTime = startTime.split(":");
  let startHour = splitedStartTime[0];
  let startMinute = splitedStartTime[1];

  const splitedEndTime = endTime.split(":");   
  let endHour = splitedEndTime[0]; 
  let endMinute = splitedEndTime[1]-15;   

  if (endMinute<0) {
      endMinute = 60 + endMinute;
      endHour = endHour - 1;
  };

  if (startHour > endHour) {
      return(true);
  } else if (startHour == endHour) {
      if (startMinute > endMinute) {
          return(true);
      } else {
          return(false);
      };        
  } else {
      return(false);
  };
};

export default TimeLimit;