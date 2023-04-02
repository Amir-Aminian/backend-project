const forgotPassSA = async (data) => {
  const response = await fetch(
    new Request(
      "http://localhost:8080/api/forgotPasswordSA", 
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
