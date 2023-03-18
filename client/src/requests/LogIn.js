const LogIn = async (data) => {
  const response = await fetch(
    new Request(
      "http://localhost:8080/api/signIn", 
      {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      }
    )
  );
  const res = await response.json();
  console.log(res);
};

export default LogIn;
