const Sequelize = require('sequelize');
const sequelize = require('../config/user.config'); 
    


const User = sequelize.define("user", {
        user_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true 
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        dob:{
            type: Sequelize.DATE
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            //  unique:true
        },
        password: {
            type: Sequelize.STRING

        },
        country: {
            type: Sequelize.STRING,
            allowNull: false,
           
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
        
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false,
         
        },
        
        gender: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        profileUrl: {
            type: Sequelize.STRING, // Store binary image data
            allowNull: true // Allow null for posts without images
        },
        zip: {
            type:Sequelize.INTEGER,
            allowNull: true,
            
          },
        is_active: {
            type:Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true // Default to active
          },

       
        });
    
       
    
    
  
    
  module.exports = User;