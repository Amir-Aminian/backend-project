import { webAddress } from "../config";

const shareRequests = async (data) => {
  const response = await fetch(
    new Request(
      `${webAddress}/api/shareRequests`, 
      {
        method: "GET",
        headers: {'Content-Type':'application/json'}
      }
    )
  );
  const result = await response.json();
  return(result);
};

export default shareRequests;
