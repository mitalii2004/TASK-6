const nodemailer = require("nodemailer");
const sendMail = async (email, name) => {

  let transporter = await nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
      user: process.env.MY_MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: '"Mitali" <mitaligoura@cqlsys.co.uk>',
    to: email,
    subject: "Welcome Mail",
    text: "WELCOME",
    html: ` welcome ${email},${name}`,
  });

  console.log("Message sent: %s", info.messageId);
  return true
};
module.exports = {
  sendMail: sendMail,
};