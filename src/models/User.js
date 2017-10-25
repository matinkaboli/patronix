import mongoose, { Schema } from 'mongoose';

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
    required: [true, 'Email required']
  },
  password: {
    type: String,
    trim: true
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
