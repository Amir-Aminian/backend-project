import { webAddress } from "../config";

const getBadgeNotification = async (data) => {
  const response = await fetch(
    new Request(
      `${webAddress}/api/getBadgeNotification`, 
      {
        method: "GET",
        headers: {'Content-Type':'application/json'}
      }
    )
  );
  const result = await response.json();
  return(result);
};

export default getBadgeNotification;
