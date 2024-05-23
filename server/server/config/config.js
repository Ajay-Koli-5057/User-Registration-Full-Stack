require('dotenv').config();
module.exports = {
   DB_HOST:"localhost",
   DB_DATABASE:"registration_users",
   DB_USER: "root",
   DB_PASSWORD:"", 
  
   // PORT: process.env.PORT,
   JWT_SECRET:process.env.JWT_SECRET,
  
}