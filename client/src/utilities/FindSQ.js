const FindSQ = (userEmail) => {
  let SQ;

  let userDataBase=JSON.parse(localStorage.getItem("userDataBase")) || [];

  let userIndex = userDataBase.findIndex((user) => user.email===userEmail);

  if (userIndex!=-1) {
      SQ = [userDataBase[userIndex].SQ1, userDataBase[userIndex].SQ2, userDataBase[userIndex].SQ3];
  } else {
      SQ = undefined;
  }
  
  return(SQ);
}

export default FindSQ;
