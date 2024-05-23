
 const userService = require("../services/userService");
 
 //--------------------------------------------------CREATE User ------------------------------------------------------------------------
async function createUser(req, res) {
   
    
    const userData = req.body;
    

    let imagePath = "";

    if (req.file) {
        imagePath = req.file.filename; // Path to the uploaded file
    }
  

    try {
      
      console.log("imagePath:", imagePath);
         const newUser = await userService.createUser(userData, 
          
          imagePath
        );
         res.status(201).json({ statuscode:201,status: 'User registered successfully', data:newUser });
       
       } catch (error) {
         res.status(500).json({statuscode:500, error: error.message });
    }
}

//----------------------------------------------Admin CAN SEE ALL USER -------------------------------------------------------------------------
async function getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({statuscode:200,status:" data fetch successfully",data:users});
    } catch (error) {
      res.status(500).json({ statuscode:500,error: 'Internal server error' });
    }
  }
  

//  ------------------------------------------ See USER  By id -----------------------------------------------------------------------------
  async function getUserById(req, res) {
  
    const userId = req.params.id;
    try {
      const user = await userService.getUserById(userId);
      res.status(200).json({statuscode:200,status:"update data successfully",data:user});
    } catch (error) {
      if (error.message === 'User not found') {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
  

//--------------------------------------------------------------- DELETE a USER------------------------------------------------------------------------------
async function deleteUser(req, res) {
    try {
      const status = await userService.deleteUser(req.params.id);
      
       res.status(200).json({status});
    } catch (error) {
      res.status(400).json({statuscode:400, error: error.message });
    }
  }
  //---------------------------------------------------------------Admin Can UPDATE a USER ------------------------------------------------------------------------------
  async function updateUserById(req, res) {
    const userId = req.params.id;
    const updatedUserData = req.body;
  
    try {
      const user = await userService.updateUserById(userId, updatedUserData);
      res.status(200).json({statuscode:200,status:"update data successfully",data:user});
    } catch (error) {
      if (error.message === 'User not found') {
        res.status(404).json({statuscode:404, error: 'User not found' });
      } else if (error.message === 'Email already exists for another user') {
        res.status(400).json({statuscode:400, error: 'Email already exists for another user' });
      } else {
        res.status(500).json({statuscode:500, error: 'Internal server error' });
      }
    }
  }



module.exports = {
    createUser,
    getAllUsers,
     getUserById,
     updateUserById,
    deleteUser,
   
    // getUserData,
  
};