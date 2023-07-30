import { webAddress } from "../config";

const manageSharedUsers = async (data) => {
  const response = await fetch(
    new Request(
      `${webAddress}/api/manageSharedUsers`, 
      {
        method: "GET",
        headers: {'Content-Type':'application/json'}
      }
    )
  );
  const result = await response.json();
  return(result);
};

export default manageSharedUsers;
