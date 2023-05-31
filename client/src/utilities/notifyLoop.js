const notifyLoop = (tasks) => {
  const timeToMiliSec = (date, startTime) => {
    const splitedStartTime = startTime.split(":");
    const startHour = splitedStartTime[0];
    const startMinute = splitedStartTime[1];
    return(date + (startHour*3600000) + (startMinute*60000));
  };

  const getTasks = (tasks, now) => {
    let task = tasks.filter((task) => timeToMiliSec(task.task_date, task.task_start_time) >= now + 1800000);
    return(task);
  };
  
  const getTask = (tasks, now) => {
    const index = tasks.findIndex((task) => timeToMiliSec(task.task_date, task.task_start_time) >= now);
    return(tasks[index]);
  };
  
  const setTimer = (task, now) => {
    const notificationTime = timeToMiliSec(task.task_date, task.task_start_time) - 1800000;
    const diff = notificationTime - now;
    return new Promise ((resolve) => 
      setTimeout(() => {
        resolve(alert(`task title: ${task.task_title}`));
      }, diff)
    );
  };
  
  const notify = async (tasks, now) => {
    let task = getTasks(tasks, now);
    task = getTask(task, now);
    await setTimer(task, now);
  };
  
  const loop = async (tasks) => {
    let now = new Date().getTime();
    while (getTasks(tasks, now).length > 0) {    
      await notify(tasks, now);
      now = new Date().getTime();
    };
  };
  
  loop(tasks);
};

export default notifyLoop;
