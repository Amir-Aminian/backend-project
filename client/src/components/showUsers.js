const ShowUsers = ({users}) => {
  if (users != null) {
    return(
      <>
        <h1>All Users:</h1>
        {users.map((user) => (
          Object.entries(user).map((user) => (
            <h5>{user[0]}:  {user[1]}</h5>
          ))
        ))}
      </>
    );
  };
}

export default ShowUsers;
