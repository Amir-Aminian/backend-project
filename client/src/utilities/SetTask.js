import TimeLimit from "../utilities/TimeLimit";

const SetTask = (startTime, endTime) => {
    if (startTime > endTime) {
        alert("Task cannot end earlier than start time.");
        return(false);
    } else if (startTime === endTime) {
        alert("Task cannot start and end at the same exact time.");
        return(false);
    };

    if (TimeLimit(startTime, endTime)) {
        alert("Task duration should at least be 15 minutes.");
        return(false);
    };
}

export default SetTask;