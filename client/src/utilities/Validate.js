const Validate = (userData) => {
  let userDataBase=JSON.parse(localStorage.getItem("userDataBase")) || [];

  let userIndex = userDataBase.findIndex((user) => user.email===userData.email && user.password===userData.password);
  
  if (userIndex!=-1) {
      userDataBase[userIndex].validated = true;
      localStorage.setItem("userEmail", userData.email);
      localStorage.setItem("userName",  userDataBase[userIndex].username);
  };

  return(userIndex);
}

export default Validate;
