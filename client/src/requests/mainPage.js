import { webAddress } from "../config";

const mainPage = async (data) => {
  const response = await fetch(
    new Request(
      `${webAddress}/api/homePage`, 
      {
        method: "GET",
        headers: {'Content-Type':'application/json'}
      }
    )
  );
  const result = await response.json();
  return(result);
};

export default mainPage;
