import { webAddress } from "../config"

const addUser = async (data) => {
  const response = await fetch(
    new Request(
      `${webAddress}/api/signUp`, 
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

export default addUser;
