const { Logger } = require('sequelize/lib/utils/logger');
const  User  = require('../models/user.model');

// ------------------------------------------Middleware function to Check User's Active Status--------------------------------------------------------
const checkUserStatus = async (req, res, next) => {
  console.log("checkUserStatus>>>>>>",);
  try {
    // Get user ID from request
    const id = req.params.id;
    // console.log(id);
    const user = await User.findOne({ where: { user_id: id} });
    // console.log("-------------"+user.user_id);
    if (!user || user.is_active === false) {
        res.status(500).json( {error:  'User not Found' });
     }
     else{
        next();
     }
  
  
  } catch (error) {
    console.error('Error checking user status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { checkUserStatus };