const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerifyEmail = async (to, link) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Account Verification",
    text: "Welcome",
    html: `
    <div>
    <p>Click <a href=${link}>here</a> to verify your email</p>
    <p>Or</p>
    <p>your can copy the link below and paste in your browser</p>
    <p>${link}</p>
    </div>
    `,
  });
};
const sendForgetPassword = async (to, link) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Password Reset",
    text: "Welcome",
    html: `
    <div>
    <p>Click <a href=${link}>here</a> to reset your password</p>
    <p>Or</p>
    <p>your can copy the link below and paste in your browser</p>
    <p>${link}</p>
    </div>
    `,
  });
};

module.exports = { sendVerifyEmail, sendForgetPassword };
