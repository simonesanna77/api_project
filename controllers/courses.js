const ErrorResponse = require('../utils/errorResponse');
const CoursesModel = require('../models/Course');

exports.getCourses = async (req, res, next)=> {
  let query;

  console.log(req.params)

  if(req.params.bootcampId) {
    query = CoursesModel.find({bootcamp: req.params.bootcampId})
  }else{
    query = CoursesModel.find();
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  });
};
