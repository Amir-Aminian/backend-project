import { webAddress } from "../config";

const acceptUser = async (data) => {
  const response = await fetch(
    new Request(
      `${webAddress}/api/acceptUser`, 
      {
        method: "PUT",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      }
    )
  );
  const result = await response.json();
  return(result);
};

export default acceptUser;
