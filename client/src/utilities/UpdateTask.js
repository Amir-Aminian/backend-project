import TimeLimit from "../utilities/TimeLimit";

const UpdateTask = (id, userTask) => {
    let usersTasks=JSON.parse(localStorage.getItem("usersTasks")) || [];
    let user = [];
    let date = [];    
    let conflict = 0;

    const findTask = (task) => {
        return (task.id != id);        
    };

    usersTasks = usersTasks.filter(findTask);
    
    if (userTask.task.startTime > userTask.task.endTime) {
        alert("Task cannot end earlier than start time.");
        return(false);
    } else if (userTask.task.startTime === userTask.task.endTime) {
        alert("Task cannot start and end at the same exact time.");
        return(false);
    };

    if (TimeLimit(userTask.task.startTime, userTask.task.endTime)) {
        alert("Task duration should at least be 15 minutes.");
        return(false);
    };

    usersTasks.forEach((data) => {
        if (data.user===userTask.user) {
            user.push(data);
        }
    });

    if (user.length === 0) {
        usersTasks.push(userTask);
        localStorage.setItem("usersTasks", JSON.stringify(usersTasks));
        return(true);
    };

    user.forEach((data) => {
        if (data.date===userTask.date) {
            date.push(data)
        } 
    });

    if (date.length === 0) {
        usersTasks.push(userTask);
        localStorage.setItem("usersTasks", JSON.stringify(usersTasks));
        return(true);
    };

    date.forEach((data) => {
        if (((data.task.startTime <= userTask.task.startTime) && (userTask.task.startTime < data.task.endTime)) || ((data.task.startTime < userTask.task.endTime) && (userTask.task.endTime <= data.task.endTime))) {
            conflict++;
        } else if (((data.task.startTime >= userTask.task.startTime) && (data.task.startTime < userTask.task.endTime)) || ((data.task.endTime > userTask.task.startTime) && (userTask.task.endTime >= data.task.endTime))) {
            conflict++;
        }
    }); 
    
    if (conflict != 0) {
        alert("You cannot add this task due to a time conflict with another task.");
        conflict = 0;
    } else {
        usersTasks.push(userTask);
        localStorage.setItem("usersTasks", JSON.stringify(usersTasks));
        return(true);        
    };
};

export default UpdateTask;