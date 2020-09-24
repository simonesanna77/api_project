const ErrorResponse = require('../utils/errorResponse');
const BootcampModel = require('../models/Bootcamp');

exports.getBootcamps = (req, res, next)=> {
  //console.log(req.query)

  let query;

  const reqQuery = {...req.query};

  const removeFields = ['select', 'sort'];

  removeFields.forEach(param => delete reqQuery[param]);

  console.log(reqQuery);

  query = BootcampModel.find(reqQuery);

  if(req.query.select) {
    const fields = req.query.select.split(',').join(' ');

    query = query.select(fields);
  }

  if(req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');

    query = query.sort(sortBy);
  }else{
    query = query.sort('-createdAt');
  }

  query.then(data => {
    res.status(200).json({
      success: true,
      count: data.length,
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