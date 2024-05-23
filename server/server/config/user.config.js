const Sequelize = require('sequelize');
const config = require("./config");
// Initialize Sequelize with your database configuration
const sequelize = new Sequelize(config.DB_DATABASE,config.DB_USER, config.DB_PASSWORD, {
    host: config.DB_HOST,
  dialect: 'mysql' ,// or any other dialect you are using
  timezone: '+05:30',// Indian Standard Time (IST) UTC+5:30
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
