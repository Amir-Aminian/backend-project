const DeleteTask = (id) => {
  let usersTasks=JSON.parse(localStorage.getItem("usersTasks")) || [];

  const findTask = (task) => {
      return (task.id != id);        
  };

  usersTasks = usersTasks.filter(findTask);
  
  localStorage.setItem("usersTasks", JSON.stringify(usersTasks));
}

export default DeleteTask;