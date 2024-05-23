const User = require("../models/user.model");
const bcrypt = require('bcrypt');
require("../middleware/authenticationMiddleware")


 //-------------------------------------------------- CREATE USER  ------------------------------------------------------------------------



async function createUser(userData,
   imageFilePath
) {
  // Hash the password
   const { firstName,lastName, dob, email, password, gender, country,city,state,zip,is_active} = userData;
  const hashedPassword = await bcrypt.hash( password, 10);

  // console.log("firstName,lastName, dob, email, password, gender, country,city,state,is_active",firstName,lastName, dob, email, password, gender, country,city,state,is_active);
  // Create a new user
  const user = await User.create({
    firstName:firstName,
    lastName:lastName,
    dob:dob,
    email:email,
    password: hashedPassword,
    
   
    gender:gender,

    country: country,
    city:city,
    state:state,

     profileUrl:imageFilePath,
     zip:zip ,
    is_active:is_active
  });

  console.log("user:", user)
 
  return user;
}

 //-------------------------------------------------- Delete User  ------------------------------------------------------------------------
async function deleteUser(user_id) {
  try {
    console.log(user_id);
    // Find the user by userId
    const user = await User.findByPk(user_id);
    
    if (!user || !user.is_active) {
       return { statuscode:404,status: 'User not found' };
    }
        
       await user.update({ is_active: false });
  
    return {statuscode:200, status: 'User deleted successfully' };
  } catch (error) {
    return { statuscode:400,status: `Error deleting user: ${error.message}`};
  }

}
//------------------------------------------------------ GET ALL USERS-------------------------------------------------
async function getAllUsers() {
  try {
    const users = await User.findAll({where:{is_active:true}});
    // console.log(">>>user",users);
    return users;
  } catch (error) {
    // Handle errors
    console.error('Error fetching users:', error);
    throw  new Error(`Error deleting user: ${error.message}`);
  }
}


//------------------------------------------Get User By Id--------------------------------------------------------

async function getUserById(user_id) {
  try {
    console.log("get id" + user_id);
    const user = await User.findByPk(user_id);
    if (!user) {
      return { message : 'User not found'};
    }
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}



///------------------------------------------------------ Update USERS by Id -------------------------------------------------




async function updateUserById(user_id, updatedUserData) {
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return { message : 'User not found'};
    }

       
    // Check if the email is being updated and if it's different from the current email
    if (updatedUserData.email && updatedUserData.email !== user.email)
    {
     // Check if the new email is already used by another user
     const existingUserWithEmail = await User.findOne({ where: { email: updatedUserData.email } });
     
     if (existingUserWithEmail) {
       // If email is already present for another user, throw an error
       return { message : 'Email already exists for another user'};
     }
    
   }
//          Check if password is being updated
       if (updatedUserData.password) {
//        Hash the new password
        const hashedPassword = await bcrypt.hash(updatedUserData.password, 10);
       
//       Update user's password with the hashed password
     updatedUserData.password = hashedPassword;
   
 }

// Update user data services
 await user.update(updatedUserData);

 return user;
  
   
} 
catch (error)
 {
      console.error('Error updating user by ID:', error);
      throw error;
}}





///------------------------------------------------------ Get USERS by Id -------------------------------------------------
async function getUserById(user_id) {
    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            return { message : 'User not found'};
        }
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}




module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUser,
    getUserById, 
 
};