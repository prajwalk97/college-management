const nodemailer = require('nodemailer');

// Setup Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "prajwalindia18@gmail.com", // Your email address
        pass: "tjjo yvwn txlt tinc", // Your email password or app-specific password
    },
});

// Function to send reset password email
const sendResetEmail = (email, token) => {
    const resetUrl = process.env.clientURL ?? `http://localhost:5173` + `/reset-password/${token}`;

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset Request',
        html: `<p>You requested for a password reset</p>
           <p>Click this <a href="${resetUrl}">link</a> to reset your password</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendResetEmail;