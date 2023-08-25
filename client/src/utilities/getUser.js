const getUser = (weekDay, tasks, sharedUsers) => {

  let date = [weekDay.weekDay, weekDay.weekDate, weekDay.weekMonth, weekDay.yearNumber];

  let users = [];

  tasks.forEach((data) => {
    if (data.task_date===new Date(date).getTime()) {
      const index = users.findIndex((user) => user === data.username);
      if (index === -1) {
        users.push(data.username);
      };
    };
  });

  if (sharedUsers.error === undefined) {sharedUsers.forEach((data) => {
    if (data.task_date===new Date(date).getTime()) {
      const index = users.findIndex((user) => user === data.username);
      if (index === -1) {
        users.push(data.username);
      };
    };
  })};

  return (users);
};

export default getUser;