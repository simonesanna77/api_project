const BootcampModel = require('../models/Bootcamp');

exports.getBootcamps = (req, res, next)=> {
  BootcampModel.find().then(data => {
    res.status(200).json({
      success: true,
      data: data
    });
  }).catch((error) => {
    console.log(error);
    res.status(400).json({success: false, error: error});
  });
};

exports.getBootcamp = (req, res, next)=> {
  BootcampModel.findById(req.params.id).then(data => {

    if(!data) {
      return res.status(400).json({success: false, error: 'item not found'});
    }

    res.status(200).json({
      success: true,
      data: data
    });
  }).catch((error) => {
    console.log(error);
    res.status(400).json({success: false, error: error});
  });
  //res.status(200).json({success: true, msg: `get bootcamp ${req.params.id}`});
};

exports.createBootcamp = (req, res, next)=> {
  BootcampModel.create(req.body).then(data => {
    res.status(201).json({
      success: true,
      data: data
    });
  }).catch((error) => {
    console.log(error);
    res.status(400).json({success: false, error: error});
  });
};

exports.updateBootcamp = (req, res, next)=> {
  BootcampModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).then(data => {

    if(!data) {
      return res.status(400).json({success: false, error: 'item not found'});
    }

    res.status(200).json({
      success: true,
      data: data
    });
  }).catch((error) => {
    console.log(error);
    res.status(400).json({success: false, error: error});
  });
  //res.status(200).json({success: true, msg: `update bootcamp ${req.params.id}`});
};

exports.deleteBootcamp = (req, res, next)=> {
  BootcampModel.findByIdAndDelete(req.params.id).then(data => {

    if(!data) {
      return res.status(400).json({success: false, error: 'item not found'});
    }

    res.status(200).json({
      success: true,
      data: data
    });
  }).catch((error) => {
    console.log(error);
    res.status(400).json({success: false, error: error});
  });
};