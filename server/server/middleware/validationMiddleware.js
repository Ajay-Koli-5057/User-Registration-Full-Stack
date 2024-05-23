
const User = require('../models/user.model');


//-----------EMAIL Validation Should not empty , should not be use again -----------------
const validateEmail =  async(req, res, next) => {

  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({statuscode:400, status: 'Email is required' });
    }

  
      // Check if the email already exists in the database
      const existingUser = await User.findOne({ where:{ email: email }});
      if (existingUser) {
       
        return res.status(400).json({ statuscode:400, status: 'Email already exists' });
      }
    } catch (error) {
      console.error('Error checking email in database:', error);
      return res.status(500).json({ statuscode:500, status: 'Internal server error' });
    }

    next();
  }


  //------------- Password And confirm password should be same----------------------

  
 const validPassword =  async(req, res, next)=> {
    const { password } = req.body;

    

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=])[a-zA-Z\d!@#$%^&*()-_+=]{8,}$/;
  

     if (!password) {
      return res.status(400).json({ statuscode:400, status: 'Password is required' });
    }
   // Regular expression for Password validation
    if ( ! passwordRegex.test(password))
    {
      return res.status(400).json({ statuscode:400,status:[{1:'At least one digit' ,
      2:'At least one lowercase letter',
      3:'At least one uppercase letter',
      4:'At least one special character',
      5:'Password length must be at least 8 characters' }]});
    }
        
    next();
    
  }
  

 module.exports = { 
   validPassword,
    validateEmail 

};