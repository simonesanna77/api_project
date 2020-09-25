const mongoose = require('mongoose');
const slugify  = require('slugify');

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please insert name'],
    unique: true,
    trim: true,
    maxlength: [50, 'name can\'t be more than 50 chars']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'please insert description'],
    maxlength: [500, 'name can\'t be more than 500 chars']
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'please insert a valid url'
    ]
  },
  phone: {
    type: String,
    maxlength: [20, 'phone number can\'t be longer than 20 chars']
  },
  email: {
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'please insert a valid email'
    ]
  },
  address: {
    type: String,
    required: [true, 'please add an address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      //required: true
    },
    coordinates: {
      type: [Number],
      //required: true,
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  careers: {
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Mobile Development',
      'Other'
    ]
  },
  averageRating: {
    type: Number,
    min: [1, 'must be at least 1'],
    max: [10, 'must can not be more than 10']
  },
  averageCost: {
    type: Number
  },
  photo: {
    type: String,
    default: 'no.photo.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

BootcampSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {lower: true})
  next();
});

BootcampSchema.pre('remove', async function(next) {
  await this.model('Course').deleteMany({bootcamp: this._id});
  next();
});

BootcampSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'bootcamp',
  justOne: false
})

module.exports = mongoose.model('Bootcamp', BootcampSchema);