const ErrorResponse = require('../utils/errorResponse');
const BootcampModel = require('../models/Bootcamp');

exports.getBootcamps = async (req, res, next)=> {
  //console.log(req.query)

  let query;

  const reqQuery = {...req.query};

  const removeFields = ['select', 'sort', 'page', 'limit'];

  removeFields.forEach(param => delete reqQuery[param]);

  console.log(reqQuery);

  query = BootcampModel.find(reqQuery).populate('courses');

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

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 50;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await BootcampModel.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if (startIndex > 0)  {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  query.then(data => {
    res.status(200).json({
      success: true,
      count: data.length,
      data: data,
      pagination
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
  BootcampModel.findById(req.params.id).then(bootcamp => {

    if(!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 400));
    }

    bootcamp.remove();

    res.status(200).json({
      success: true,
      data: bootcamp
    });
  }).catch((error) => {
    next(error);
  });
};