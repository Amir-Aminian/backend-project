import React, { useState } from "react"
import ShowUsers from "./components/showUsers";

function App() {
  const [users, setUsers] = useState(null);

  const url = "http://localhost:8080/user";
  const request = new Request(url, {
    method: "get"
  });
  
  async function getData() {
    const response = await fetch(request);
    const data = await response.json();
    setUsers(data);
    console.log(data);
  };

  return (
    <>
      <ShowUsers users={users} />
      <button onClick={() => getData()}>Get All Users</button>
    </>
  );
}

export default App;
