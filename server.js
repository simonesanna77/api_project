const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

dotenv.config({path: './config/config.env'});

connectDB();

//routes
const routes = require('./routes/bootcamp');

const app = express();

//body parser
app.use(express.json());

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT;

app.use('/api/v1/bootcamps', routes);

app.use(errorHandler);

const server = app.listen(PORT, console.log(`${process.env.NODE_ENV} on ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);

  server.close(() => process.exit(1));
});