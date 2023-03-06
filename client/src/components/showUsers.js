const ShowUsers = ({users}) => {
  if (users != null) {
    return(
      <>
        <h1>All Users:</h1>
        {users.map((user) => (
          Object.entries(user).map((user) => (
            <h2>{user[0]}:  {user[1]}</h2>
          ))
        ))}
      </>
    );
  };
}

export default ShowUsers;
