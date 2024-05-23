
// controllers/authController.js

const emailService = require('../services/emailServices');
// const jwt = require("jsonwebtoken");




//-------------------------------------------------- forget Password then send Email to the User ------------------------------------------------------------------------
async function forgotPassword(req, res) {
    console.log(">>>>>>>>>>working----------forgotPassword");
    try {
        const { email}  = req.body;
            
       await emailService.sendResetPasswordEmail(email);
        res.status(200).json({statuscode:200,status: 'Reset password email sent successfully' });
    } catch (error) {
       res.status(404).json({statuscode:404,error:error.message});
    }
}


//-------------------------------------------------- Reset Password ------------------------------------------------------------------------
async function resetPassword(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization header missing or invalid' });
        }

        const token = authHeader.split(' ')[1]; // Extract token without 'Bearer' prefix

         const {password,confirmPassword}  = req.body;
        

        if (!password || !confirmPassword) {
            return res.status(400).json({ statuscode:400,error: 'Password missing' });
        }

       const user =await emailService.resetPassword(token, password,confirmPassword);
        res.status(205).json({statuscode:205,status: 'Password reset successful',data:user});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    forgotPassword,
    resetPassword,
};

