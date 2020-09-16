exports.getBootcamps = (req, res, next)=> {
  res.status(200).json({success: true, msg: 'show all bootcamps', hello: req.hello});
};

exports.getBootcamp = (req, res, next)=> {
  res.status(200).json({success: true, msg: `get bootcamp ${req.params.id}`});
};

exports.createBootcamp = (req, res, next)=> {
  res.status(200).json({success: true, msg: 'create bootcamps'});
};

exports.updateBootcamp = (req, res, next)=> {
  res.status(200).json({success: true, msg: `update bootcamp ${req.params.id}`});
};

exports.deleteBootcamp = (req, res, next)=> {
  res.status(200).json({success: true, msg: `delete bootcamp ${req.params.id}`});
};