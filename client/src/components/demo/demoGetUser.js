const demoGetUser = (weekDay, tasks, demoTasks) => {

  let date = [weekDay.weekDay, weekDay.weekDate, weekDay.weekMonth, weekDay.yearNumber];

  let users = [];

  tasks.forEach((data) => {
    if (data.date===new Date(date).getTime()) {
      const index = users.findIndex((user) => user === data.user);
      if (index === -1) {
        users.push(data.user);
      };
    };
  });

  demoTasks.forEach((data) => {
    if (data.status === true && data.date===new Date(date).getTime()) {
      const index = users.findIndex((user) => user === data.user);
      if (index === -1) {
        users.push(data.user);
      };
    };
  });

  return (users);
};

export default demoGetUser;