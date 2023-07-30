import { webAddress } from "../config";

const removeTask = async (data) => {
  const response = await fetch(
    new Request(
      `${webAddress}/api/deleteTask`, 
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

export default removeTask;
