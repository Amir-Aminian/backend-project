const GetTask = (date, tasks) => {
  let usersTasks= tasks || [];
  let dayTasks= [];

  usersTasks.forEach((data) => {
      if (data.task_date===new Date(date).getTime()) {
          dayTasks.push(data);
      };
  });
  return (dayTasks);
}

export default GetTask;