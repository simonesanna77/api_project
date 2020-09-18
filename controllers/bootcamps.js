const ErrorResponse = require('../utils/errorResponse');
const BootcampModel = require('../models/Bootcamp');

exports.getBootcamps = (req, res, next)=> {
  BootcampModel.find().then(data => {
    res.status(200).json({
      success: true,
      data: data
    });
  }).catch((error) => {
    next(error);
  });
};

exports.getBootcamp = (req, res, next)=> {
  BootcampModel.findById(req.params.id).then(data => {

    if(!data) {
      return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 400));
    }

    res.status(200).json({
      success: true,
      data: data
    });
  }).catch((error) => {
    next(error);
  });
};

exports.createBootcamp = (req, res, next)=> {
  BootcampModel.create(req.body).then(data => {
    res.status(201).json({
      success: true,
      data: data
    });
  }).catch((error) => {
    next(error);
  });
};

exports.updateBootcamp = (req, res, next)=> {
  BootcampModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).then(data => {

    if(!data) {
      return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 400));
    }

    res.status(200).json({
      success: true,
      data: data
    });
  }).catch((error) => {
    next(error);
  });
};

exports.deleteBootcamp = (req, res, next)=> {
  BootcampModel.findByIdAndDelete(req.params.id).then(data => {

    if(!data) {
      return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 400));
    }

    res.status(200).json({
      success: true,
      data: data
    });
  }).catch((error) => {
    next(error);
  });
};