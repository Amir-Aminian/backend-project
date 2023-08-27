import { webAddress } from "../config";
import { toast } from 'react-toastify';

const notifyLoop = (tasks) => {
  let timeout;
  
  let registration = null; 
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((reg) => {
        console.log('Service Worker registered with scope:', reg.scope);
        registration = reg;
      })
      .catch((error) => {
        console.error(`Registration failed with ${error}`);
      });
  }; 

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
    if (registration) {
      registration.active.postMessage({
        title: "Schedule Assistant",
        body: `Event: ${task.task_title}\n${task.task_start_time} - ${task.task_end_time}`,
        icon: "logo.png",
        webAddress: webAddress
      });
    };
    toast.info(`You have an event starting in 30 minutes.\nEvent: ${task.task_title}`, {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
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
