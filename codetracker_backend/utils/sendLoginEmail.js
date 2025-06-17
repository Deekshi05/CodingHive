import nodemailer from "nodemailer";

export const sendLoginEmail = async (email, username) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use 'smtp.ethereal.email' for testing
      auth: {
        user: process.env.EMAIL_USER, // your email (Gmail, etc.)
        pass: process.env.EMAIL_PASS, // app password or real password
      },
    });

    const mailOptions = {
      from: `"Login Alert" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "New Login Notification",
      html: `
        <p>Hello <strong>${username}</strong>,</p>
        <p>You have successfully logged into your account.</p>
        <p>If this wasn’t you, please reset your password immediately.</p>
        <p>Thanks,<br/>CodingHiveTeam</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Login email sent to:", email);
  } catch (err) {
    console.error("Failed to send login email:", err.message);
  }
};
