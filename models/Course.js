const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'please insert a title']
  },
  description: {
    type: String,
    required: [true, 'please add a description']
  },
  weeks: {
    type: String,
    required: [true, 'please add number of weeks']
  },
  tuition: {
    type: Number,
    required: [true, 'please add a tuition cost']
  },
  minimunSkill: {
    type: String,
   // required: [true, 'please add a minimun skill'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  scolarshipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  }
});

module.exports = mongoose.model('Course', CourseSchema);