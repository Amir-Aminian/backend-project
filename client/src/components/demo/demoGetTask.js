const GetTask = (weekDay, tasks, demoTasks) => {

  let date = [weekDay.weekDay, weekDay.weekDate, weekDay.weekMonth, weekDay.yearNumber];

  let userTasks= tasks || [];
  
  let dayTasks= [];

  userTasks.forEach((data) => {
      if (data.date===new Date(date).getTime()) {
        dayTasks.push(data);
      };
  });

  demoTasks.forEach((data) => {
    if (data.status === true && data.date===new Date(date).getTime()) {
      dayTasks.push(data);
    };
  });

  return (dayTasks);
}

export default GetTask;