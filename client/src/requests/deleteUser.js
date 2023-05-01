const deleteUser = async (data) => {
  const response = await fetch(
    new Request(
      "http://localhost:8080/api/deleteUser", 
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

export default deleteUser;