import { webAddress } from "../config";

const forgotPassSQ = async (data) => {
  const response = await fetch(
    new Request(
      `${webAddress}/api/forgotPassword/SQ`, 
      {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      }
    )
  );
  const result = await response.json();
  return(result[0]);
};

export default forgotPassSQ;
