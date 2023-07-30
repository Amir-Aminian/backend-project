import { webAddress } from "../config";

const getSharedUsers = async (data) => {
  const response = await fetch(
    new Request(
      `${webAddress}/api/getSharedUsers`, 
      {
        method: "GET",
        headers: {'Content-Type':'application/json'}
      }
    )
  );
  const result = await response.json();
  return(result);
};

export default getSharedUsers;
