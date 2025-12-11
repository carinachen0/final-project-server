/*==================================================
/database/models/Student.js

It defines the student model for the database.
==================================================*/
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

const Student = db.define("student", {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type:Sequelize.STRING,
    allowNull: false, //required field
    unique: true, //different emails for each student
    valiidate: {
      isEmail: true //checks if it is a valid email address
    }
  },

  imageUrl: {
    type:Sequelize.STRING,
    valiidate: {
      isUrl: true, //checks if its a valid URL
    },
    defaultValue: 'https://t3.ftcdn.net/jpg/02/92/61/84/240_F_292618444_93dQ496UFT4d6Eu0dlRQYgvlkK9snCMm.jpg' // placeholder image
  },

  gpa: {
    type: Sequelize.DECIMAL(2,1), //sets precision to GPA format (2 digits total, 1 digit after decimal)
    validate: { 
      // set boundary limits for a valid GPA
      isDecimal: true,
      min: 0.0,
      max: 4.0,
    }
  }
});

// Export the student model
module.exports = Student;