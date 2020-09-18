const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {

  console.log(err.errors);

  let error = {...err};
  let message = '';
  
  if(err.name === 'CastError') {
    message = `Bootcamp not found with id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  if(err.name === 'ValidationError') {
    message = Object.values(err.errors).map(v => v.message);
    error = new ErrorResponse(message, 400);
  }

  if(err.code === 11000) {
    message = `Bootcamp with name "${err.keyValue.name}" already exsist`;
    error = new ErrorResponse(message, 400);
  } 

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;