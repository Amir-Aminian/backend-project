import TimeLimit from "../utilities/TimeLimit";
import { toast } from 'react-toastify';

const SetTask = (startTime, endTime) => {
    if (startTime > endTime) {
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
    } else if (startTime === endTime) {
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

    if (TimeLimit(startTime, endTime)) {
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
}

export default SetTask;