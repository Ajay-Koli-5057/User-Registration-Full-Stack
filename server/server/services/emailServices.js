

const nodemailer = require('nodemailer');
const  User  = require('../models/user.model'); // Assuming you have a User model
const config = require("../config/config")
const bcrypt =require("bcrypt");
require("dotenv").config();
const jwt = require('jsonwebtoken');

//-------------------------------------------------- forget Password then send Email to the User ------------------------------------------------------------------------

async function sendResetPasswordEmail(email) {
 console.log("user>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
   
    const token = jwt.sign({ userId: user.user_id, email: user.email }, config.JWT_SECRET, { expiresIn: '1h' });
     console.log("token------>"+token);
    const transporter = nodemailer.createTransport({
        // Your nodemailer transport configuration
        service: 'gmail',
        auth: {
          user: 'dipti.patil.5057@gmail.com', // Your Gmail email address
          pass: 'znfp simh dwyt lncv', // Your Gmail password
        }
    });
     
    const resetPasswordLink = `http://localhost:3000/reset-password?token=${token}`;
    console.log("resetPasswordLink ",resetPasswordLink );
    await transporter.sendMail({
        to: email,
        subject: 'Reset Password Now',
        text: `To reset your password, click on the following link: ${resetPasswordLink}`,
    });
}

//-------------------------------------------------- Reset Password ------------------------------------------------------------------------
async function resetPassword(token, newPassword,newconfirmPassword) {
    // console.log("token"+token);
    const decodedToken = jwt.verify(token , config.JWT_SECRET);
    // console.log(">>>LLLLLLLLLLLLLLLLLLLLLLLLL",decodedToken);
    const user = await User.findByPk(decodedToken.userId);

    if (!user) {
        throw new Error('User not found');
    }

    if(newPassword !== newconfirmPassword)
    {
        throw new Error('Password and Confirm Password are not matched');      
    }
    else{
        
        const hashednewPassword = await bcrypt.hash(newPassword, 10);
        user.password =  hashednewPassword;
        await user.save();

        return user;
    }

      
    
   
    
  
}

module.exports = {
    sendResetPasswordEmail,
     resetPassword,
};
