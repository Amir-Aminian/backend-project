import React, { useState } from "react";

function App() {
  const [users, setUsers] = useState(null);

  const url = "http://localhost:8080/user";

  const request1 = new Request(url, {
    method: "GET"
  });

  const request2 = new Request(url, {
    method: "POST",
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      id: 5,
    username: "amir",
    email: "amir@gmail.com",
    password: "12345678"
    })
  });

  const request3 = new Request("http://localhost:8080/user/5", {
    method: "DELETE"
  });

  const request4 = new Request("http://localhost:8080/user/5", {
    method: "PUT",
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      id: 5,
    username: "brandon",
    email: "brandon@gmail.com",
    password: "12345678"
    })
  });
  
  const getData = async (request) => {
    const response = await fetch(request);
    const data = await response.json();
    setUsers(data);
    console.log(data);
  };

  const postData = async (request) => {
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
  };

  const deleteData = async (request) => {
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
  };

  const updateData = async (request) => {
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <ShowUsers users={users} />
      <button onClick={() => getData(request1)}>Get all users</button>
      <button onClick={() => postData(request2)}>Add another user</button>
      <button onClick={() => deleteData(request3)}>Delete a user</button>
      <button onClick={() => updateData(request4)}>Update a user</button>
    </>
  );
}

export default App;
