const CoursesModel = require('../models/Course');
const BootcampModel = require('../models/Bootcamp');

exports.getCourses = async (req, res, next)=> {
  let query;

  if(req.params.bootcampId) {
    query = CoursesModel.find({bootcamp: req.params.bootcampId})
  }else{
    query = CoursesModel.find().populate({
      path: 'bootcamp',
      select: 'name description'
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  });
};

exports.getCourse = (req, res, next)=> {
  
  CoursesModel.findById(req.params.id).populate({path: 'bootcamp', select: 'name description'}).then(course => {

    if(!course) {
      return next(new ErrorResponse(`Course not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: course
    });
  }).catch((error) => {
    next(error);
  });
};

exports.addCourse = (req, res, next)=> {
  
  req.body.bootcamp = req.params.bootcampId;

  BootcampModel.findById(req.params.bootcampId).then(bootcamp => {

    if(!bootcamp) {
      return next(new ErrorResponse(`Boocamp not found with id ${req.params.bootcampId}`, 404));
    }

    CoursesModel.create(req.body).then(course => {
      res.status(200).json({
        success: true,
        data: course
      });
    });

  }).catch((error) => {
    next(error);
  });
  
};
