// services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const Config = require('../config/config');
const crypto = require('crypto');
const nodemailer = require('nodemailer');





//-------------------------------------------------- Login User ------------------------------------------------------------------------


async function login(email, password) {
  try {
    const user = await User.findOne({ where: {email} });
   
  if (!user || user.is_active === false) {
     return {error:  'Invalid username or inactive account' };
  }
  if (!bcrypt.compareSync(password, user.password)) {
      return { error: 'Incorrect password' };
    }

     // Generate JWT token
    const token = jwt.sign({userId: user.user_id, email: user.email }, Config.JWT_SECRET  , { expiresIn: '2h' });
    console.log("token",token);
    return { token: token};
 
  } catch (error) {
    console.error('Login failed:', error);
    return { error: 'Internal server error' };
  }
}






module.exports = { login};