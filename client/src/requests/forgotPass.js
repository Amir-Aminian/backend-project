const forgotPass = async (data) => {
  const response = await fetch(
    new Request(
      "http://localhost:8080/api/forgotPassword", 
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

export default forgotPass;
