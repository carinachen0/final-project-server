/*==================================================
/database/models/Campus.js

It defines the campus model for the database.
==================================================*/
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

// Define the campus model
const Campus = db.define("campus", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false
  },

  description: {
    type: Sequelize.STRING,
  },

  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true // checks if string follows the format of a valid url 
    },
    defaultValue:'https://macaulay.cuny.edu/wp-content/uploads/2016/07/college-of-staten-island-main-walkway-lamp-posts-fountain-214.jpg' // placeholder img
  }
});

// Export the campus model
module.exports = Campus;