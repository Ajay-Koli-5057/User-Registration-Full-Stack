const User = require('./user.model');

const sequelize = require('../config/user.config'); 

async function syncModels() {
  let syncValue = false;
    await sequelize.sync({ force: syncValue, models: [User] });
    console.log('All models synchronized');
};

module.exports = 
syncModels()

;