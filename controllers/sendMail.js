const nodemailer = require("nodemailer");
const sendMail = async (req, res) => {
  

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
    to: "jeevan13798@gmail.com", 
    subject: "Welcome Mail", 
    text: "WELCOME",
    html: "Welcome dear",
  });

  console.log("Message sent: %s", info.messageId);

  res.json(info);
};
module.exports = {
  sendMail: sendMail,
};