import { toast } from 'react-toastify';

const demoDeleteTask = (id, tasks, setTasks) => {
  if (id === "Demo") {
    toast.warning("You cannot delete another user's task.", {
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
    
  } else {
    let newTasks = tasks;

    const findTask = (task) => {
        return (task.id != id);        
    };

    newTasks = newTasks.filter(findTask);
    
    setTasks(newTasks);

    return(true);

  };
}

export default demoDeleteTask;