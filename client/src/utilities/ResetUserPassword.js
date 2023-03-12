const ResetUserPassword = (userEmail, newPassword) => {
  let userDataBase=JSON.parse(localStorage.getItem("userDataBase")) || [];

  let userIndex = userDataBase.findIndex((user) => user.email===userEmail);

  userDataBase[userIndex].password = newPassword;

  userDataBase[userIndex].confirmPassword = newPassword;
  
  localStorage.setItem("userDataBase", JSON.stringify(userDataBase));
}

export default ResetUserPassword;
