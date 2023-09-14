import TimeLimit from "../../utilities/TimeLimit";
import { toast } from 'react-toastify';

const demoSetTask = (task, tasks, setTasks) => {
  let newTasks = tasks;
  let user = [];
  let date = [];    
  let conflict = 0;

  if (task.startTime > task.endTime) {
    toast.warning("Task cannot end earlier than start time.", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    return(false);
  } else if (task.startTime === task.endTime) {
    toast.warning("Task cannot start and end at the same exact time.", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    return(false);
  };

  if (TimeLimit(task.startTime, task.endTime)) {
    toast.warning("Task duration should at least be 15 minutes.", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    return(false);
  };

  newTasks.forEach((data) => {
    if (data.user===task.user) {
      user.push(data);
    }
  });

  if (user.length === 0) {
    newTasks.push(task);
    setTasks(newTasks);
    return(true);
  };

  user.forEach((data) => {
    if (data.date===task.date) {
      date.push(data)
    } 
  });

  if (date.length === 0) {
    newTasks.push(task);
    setTasks(newTasks);
    return(true);
  };

  date.forEach((data) => {
    if (((data.startTime <= task.startTime) && (task.startTime < data.endTime)) || ((data.startTime < task.endTime) && (task.endTime <= data.endTime))) {
      conflict++;
    } else if (((data.startTime >= task.startTime) && (data.startTime < task.endTime)) || ((data.endTime > task.startTime) && (task.endTime >= data.endTime))) {
      conflict++;
    }
  }); 
  
  if (conflict != 0) {
    toast.warning("You cannot add this task due to a time conflict with another task.", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    conflict = 0;
  } else {
    newTasks.push(task);
    setTasks(newTasks);
    return(true);        
  };
}

export default demoSetTask;