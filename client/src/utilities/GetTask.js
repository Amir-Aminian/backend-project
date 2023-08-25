const GetTask = (weekDay, tasks, sharedUsers) => {

  let date = [weekDay.weekDay, weekDay.weekDate, weekDay.weekMonth, weekDay.yearNumber];

  let usersTasks= tasks || [];
  
  let dayTasks= [];

  usersTasks.forEach((data) => {
      if (data.task_date===new Date(date).getTime()) {
        dayTasks.push(data);
      };
  });

  if (sharedUsers.error === undefined) {sharedUsers.forEach((data) => {
    if (data.task_date===new Date(date).getTime()) {
      dayTasks.push(data);
    };
  })};
  
  return (dayTasks);
}

export default GetTask;