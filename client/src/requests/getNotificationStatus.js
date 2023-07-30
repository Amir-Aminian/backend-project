import { webAddress } from "../config";

const getNotificationStatus = async (data) => {
  const response = await fetch(
    new Request(
      `${webAddress}/api/notificationStatus`, 
      {
        method: "GET",
        headers: {'Content-Type':'application/json'}
      }
    )
  );
  const result = await response.json();
  return(result);
};

export default getNotificationStatus;
