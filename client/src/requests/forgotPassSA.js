import { webAddress } from "../config";

const forgotPassSA = async (data) => {
  const response = await fetch(
    new Request(
      `${webAddress}/api/forgotPassword/SA`, 
      {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      }
    )
  );
  const result = await response.json();
  return(result);
};

export default forgotPassSA;
