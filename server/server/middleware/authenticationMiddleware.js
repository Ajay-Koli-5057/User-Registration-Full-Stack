const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Config = require('../config/config');


//------------------------------------------------------- VERIFY THE USER--------------------------------------------------------- 


 async function authenticateUser(req, res, next) {
  // Check if there is a token in the request headers
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Unauthorized - Token not provided' });
  }
  
  // Extract the token part by splitting the header
  const token = authHeader.split(' ')[1];
  console.log(token);

  try {
    const decoded = jwt.verify(token, Config.JWT_SECRET);
    console.log( "req.user...." + decoded);
    req.user = decoded;

     

   
    next(); // Call the next middleware
} catch (error) {
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Unauthorized - Token expired' });
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    } else {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


  } ;


module.exports = { authenticateUser };
