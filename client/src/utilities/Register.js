const Register = (newUser) => {
  let userDataBase=JSON.parse(localStorage.getItem("userDataBase")) || [];

  let userIndex = userDataBase.findIndex((user) => user.email===newUser.email);

  if (userIndex!=-1) {
      alert("This Email Address has already been used befor.\nPlease sign in or try to sign up agian with a new Email Address.");
  } else {
      newUser.validated = false;

      userDataBase.push(newUser);
      
      localStorage.setItem("userDataBase", JSON.stringify(userDataBase));
  }
}

export default Register;
