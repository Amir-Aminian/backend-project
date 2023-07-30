import { webAddress } from "../config";

const forgotPassReset = async (data) => {
  const response = await fetch(
    new Request(
      `${webAddress}/api/forgotPassword/reset`, 
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

export default forgotPassReset;
