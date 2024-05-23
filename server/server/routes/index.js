const express = require("express");
const route = express.Router();

// //
// const  userController  = require("../controller/userController");
// const Validator = require('../middleware/validationMiddleware');
// //
 const userroute = require("./user.routes");

 const path = require("path");


  const multer = require('multer');

const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath =path.join(__dirname,"../public");
       
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
        // cb(null, 'server/public/')// Specify the destination directory for file uploads


    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' +  path.extname(file.originalname)); // Customize file name
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB limit (adjust as needed)
    }
});
  
//   route.use();
  





// // const userroute = require("./user.routes");
// // const Validator = require('../middleware/validationMiddleware');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadPath =path.join(__dirname,"../public");
//         console.log("---------------",path.join(__dirname,"../public"));
//         if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath, { recursive: true });
//         }
//         cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
// });
    route.use("/user", 
        upload.single('image'), userroute);
// route.use("/user",userroute);





module.exports = route;