const notifyLoop = (tasks) => {
  let timeout;

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

  const notifyMe = (task) =>{
    const notification = new Notification("Schedule Assistant", {body: `Event: ${task.task_title}\n${task.task_start_time} - ${task.task_end_time}` ,icon: "logo.png"});
    notification.onclick = (event) => {
      event.preventDefault();
      window.open("http://localhost:8080/homePage");
    };
    setTimeout(() => {
      alert(`You have an event starting in 30 minutes.\nEvent: ${task.task_title}`);
    }, 20); 
    };
  
  const setTimer = (task, now) => {
    const notificationTime = timeToMiliSec(task.task_date, task.task_start_time) - 1800000;
    const diff = notificationTime - now;
    return new Promise ((resolve) => {
      timeout = setTimeout(() => {
        resolve(notifyMe(task));
      }, diff);
    });
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
  return(timeout);
};

export default notifyLoop;
