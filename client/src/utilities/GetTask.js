const GetTask = (date) => {
  let usersTasks=JSON.parse(localStorage.getItem("usersTasks")) || [];
  let dayTasks= [];

  usersTasks.forEach((data) => {
      if (data.date===new Date(date).getTime()) {
          dayTasks.push(data);
      }
  });

  return (dayTasks);
}

export default GetTask;