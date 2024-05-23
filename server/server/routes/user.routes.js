const express = require("express");
const router = express.Router();
const  userController  = require("../controller/userController");

const authController = require('../controller/authController');
const authMiddleware = require("../middleware/authenticationMiddleware");

const status = require("../middleware/checkStatusMiddleware");


const Validator = require('../middleware/validationMiddleware');

//----------------------------------------------------------------Create User-------------------------------------------------------------------

router.post("/create", Validator.validateEmail,Validator.validPassword,userController.createUser);
router.get("/getAlluser", userController.getAllUsers);
 router.get("/user/:id", userController.getUserById);
 router.delete("/user/:id", userController.deleteUser);



 

router.put('/update/:id',  Validator.validPassword, userController.updateUserById);
// router.delete('/delete/:userId', userController.deleteUser);



 //----------------------------------------------------------------Login User ------------------------------------------------------------------

 router.post('/login', authController.login);


//----------------------------------------------------------------User Can Delete Own Data------------------------------------------------------------------
 router.delete('/delete', authMiddleware.authenticateUser,authController.DeleteUserData);


  //----------------------------------------------------------------User Can get Own Data------------------------------------------------------------------
  router.get('/userdata', authMiddleware.authenticateUser, authController.getUserData);



  //----------------------------------------------------------------User Can Update Own Data------------------------------------------------------------------
  router.put('/updateUser', authMiddleware.authenticateUser,authController.updateUserData);



  //-------------------------------------------------- forget Password then send Email to the User ------------------------------------------------------------------------

const  EmailController  = require("../controller/emailController");
router.post('/forgot-password',EmailController.forgotPassword);



//-------------------------------------------------- Reset Password ------------------------------------------------------------------------
    router.post('/reset-password',Validator.validPassword,EmailController.resetPassword);


module.exports = router;  