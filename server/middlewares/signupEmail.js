const signUpEmail = (username, vLink) => {
  return(`
    <div style="margin: auto; width: 80%; border: 1px groove black; text-align: center">
      <h2 style="padding: 15px 32px; background-color: #4285F4; color: white">Schedule Assitant</h2>
      <h3>Welcom, ${username}</h3>
      <p>Thank you for signing up for Schedule Assisant. We're excited to have you onboard.</p>
      <p>To get started using Schedule Assistant, please confirm your email below:</p>
      <a href="${vLink}" style="
        background-color: #4285F4;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
      ">Verify your email</a>
      <p>For your security the link will expire in 5 minutes.</p>
      <br>
      <p>If you didn't sign up for this account you can ignore this email and the account will be deleted.</p> 
      <h6 style="padding: 15px 32px; background-color: #DCDCDC">&copy;2023Schedule Assistant. All rights reserved.</h6>
    </div> 
  `);
};

module.exports = signUpEmail;
