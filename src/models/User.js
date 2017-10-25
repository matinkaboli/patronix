import mongoose, { Schema } from 'mongoose';

const emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const fullName = new Schema({
  first: {
    type: String,
    trim: true,
    required: [true, 'First name required']
  },
  last: {
    type: String,
    trim: true,
    required: [true, 'Last name required']
  }
});

const schema = new Schema({
  name: fullName,
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator(v) {
        return emailValidate.test(v);
      },
      message: 'It is not a valid email'
    },
    required: [true, 'Email required']
  },
  password: {
    type: String,
    trim: true,
    validate: {
      validator(v) {
        return passwordValidate.test(v);
      },
      message: 'It is not a valid password'
    },
    required: [true, 'Password required']
  },
  phone: {
    type: String,
    validate: {
      validator(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: 'It is not a valid phone number!'
    },
    trim: true
  },
  type: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
    trim: true
  },
  expireTime: {
    type: Number,
    trim: true
  },
  status: {
    type: Number,
    enum: [0, 1, 2, 3],
    required: true,
    trim: true
  },
  activationLink: {
    type: String
  }
});

export default mongoose.model('User', schema);
