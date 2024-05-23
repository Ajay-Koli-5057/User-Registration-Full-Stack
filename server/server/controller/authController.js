// controllers/authController.js
const authService = require('../services/authService');
const userService =require('../services/userService')

  //----------------------------------------------------------------Login User ------------------------------------------------------------------

async function login(req, res) {
  // console.log(">>",req.body);
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  if (result.error) {
    return res.status(401).json({statuscode:401,message: result.error });
  }
  res.status(200).json({statuscode:"200",status:"login successfully", token: result.token });
}

 //----------------------------------------------------------------User Can get Own Data------------------------------------------------------------------

async function getUserData(req, res) {

  try {
     // Get the user ID from the authenticated request
  const user_id = req.user.userId;

   const userData = await  userService.getUserById(user_id);
  
  // Respond with the user data
   res.status(200).json({statuscode:"200",status:"fetch data successfully",data: userData});

  } catch (error) {
        res.status(500).json({statuscode:"500",status:error.message});
  }
}

 //----------------------------------------------------------------User Can Update Own Data------------------------------------------------------------------

async function updateUserData(req, res) {

 
     // Get the user ID from the authenticated request
  const user_id = req.user.userId;
  console.log("userId " + user_id);
   const updatedUserData = req.body;
  
    try {
      const user = await userService.updateUserById(user_id, updatedUserData);
      res.status(200).json({statuscode:"200",status:"Update data successfully",data:user});
    } catch (error) {
      if (error.message === 'User not found') {
        res.status(404).json({ statuscode:"404", error: 'User not found' });
      } else if (error.message === 'Email already exists for another user') {
        res.status(400).json({ statuscode:"400",error: 'Email already exists for another user' });
      } else {
        res.status(500).json({statuscode:"500", error: 'Internal server error' });
      }
    }
}

 //----------------------------------------------------------------User Can Delete Own Data------------------------------------------------------------------

async function DeleteUserData(req, res) {

try {
     // Get the user ID from the authenticated request
           const user_id = req.user.userId;

  // console.log(user_id);

         const result = await  userService.deleteUser(user_id);
         res.status(200).json({result});

    } 
catch (error) {
         res.status(500).json({status:"500",message:error.message});
  }
}

module.exports = {
   login,
   getUserData,
   DeleteUserData ,
   updateUserData
   

  };

