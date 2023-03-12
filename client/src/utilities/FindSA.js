const FindSA = (userEmail) => {
  let SA;

  let userDataBase=JSON.parse(localStorage.getItem("userDataBase")) || [];

  let userIndex = userDataBase.findIndex((user) => user.email===userEmail);

  if (userIndex!=-1) {
      SA = [userDataBase[userIndex].SA1, userDataBase[userIndex].SA2, userDataBase[userIndex].SA3];
  } else {
      SA = undefined;
  }
  
  return(SA);
}

export default FindSA;
