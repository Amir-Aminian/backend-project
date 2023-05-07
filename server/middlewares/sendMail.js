const nodemailer = require("nodemailer");
const user = process.env.EMAIL;
const pass = process.env.EMAILPASS;
const config = {
  service: "gmail",
  auth : {
    user: user,
    pass: pass
  }
};
const transporter = nodemailer.createTransport(config);

const sendMail = async (userEmail, email, subject) => {
  try {
    const message = {
      from: user,
      to: userEmail,
      subject: subject,
      html: email
    };
    await transporter.sendMail(message);
    return(true);
  } catch (error) {
    return({err: error});
  }
};

module.exports = sendMail;
