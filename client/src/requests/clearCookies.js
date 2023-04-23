const clearCookies = async () => {
  const response = await fetch(
    new Request(
      "http://localhost:8080/api/clearCookies", 
      {
        method: "GET",
        headers: {'Content-Type':'application/json'}
      }
    )
  );
  const result = await response.json();
  return(result);
};

export default clearCookies;
