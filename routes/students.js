/*==================================================
/routes/students.js

It defines all the students-related routes.
==================================================*/
// Import Express module
const express = require('express');
// Create an Express router function called "router"
const router = express.Router();
// Import database models
const { Student, Campus } = require('../database/models');

// Import a middleware to replace "try and catch" for request handler, for a concise coding (fewer lines of code)
const ash = require('express-async-handler');

/* GET ALL STUDENTS: async/await using "try-catch" */
// router.get('/', async (req, res, next) => {
//   try {
//     let students = await Student.findAll({include: [Campus]});
//     res.status(200).json(students);
//   } 
//   catch(err) {
//     next(err);
//   }
// });

/* GET ALL STUDENTS: async/await using express-async-handler (ash) */
// Automatically catches any error and sends to Routing Error-Handling Middleware (app.js)
// It is the same as using "try-catch" and calling next(error)
router.get('/', ash(async(req, res) => {
  //find stuent by 
  let students = await Student.findAll({include: [Campus]});
  res.status(200).json(students);  // Status code 200 OK - request succeeded
}));

/* GET STUDENT BY ID */
router.get('/:id', ash(async(req, res) => {
  // Find student by Primary Key (id)
  let student = await Student.findByPk(req.params.id, {include: [Campus]});  // Get the student and its associated campus
  if (student) {
    res.status(200).json(student);  // Status code 200 OK - request succeeded
  } else {
    res.status(404).json({error: 'Student not found'}); // Error handling: status code 404 (Not Found)
  }
}));

/* ADD NEW STUDENT */
router.post('/', function(req, res, next) {
  Student.create(req.body)
    .then(createdStudent => res.status(200).json(createdStudent))
    .catch(err => next(err));
});

/* DELETE STUDENT */
router.delete('/:id', function(req, res, next) {
  Student.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(200).json("Deleted a student!"))
    .catch(err => next(err));
});

/* EDIT STUDENT */
router.put('/:id', ash(async(req, res) => {
  const { campusId, ...studentData } = req.body; //separates campusID from other student data to prevent accidental modification  
  const student = await Student.findByPk(req.params.id); //uses sequelize to find and fetch a student based on id

  if (student) { // check if student exists
    await student.update(studentData); //update student fields

    if (campusId !== undefined) { //if a valid campusId was provided in the request
      const campus = await Campus.findByPk(campusId); 
      
      if (!campus) { //Check if campus. exists. If not, throw an error
        throw new Error('Campus ID not found');
      }
      await student.setCampus(campus); // otherwise, update the student's campus association 
    }
  }

  const updatedStudent = await Student.findByPk(req.params.id, { include: [Campus] }); //fetch updated student with campus and return data to client
  if (updatedStudent) {
    res.status(200).json(updatedStudent);  // Status code 200 OK - request succeeded
  } else {
    res.status(404).json({error: 'Student not found'}); // Error handling: status code 404 (Not Found)
  }
}));

// Export router, so that it can be imported to construct the apiRouter (app.js)
module.exports = router;