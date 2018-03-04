import mongoose, { Schema } from 'mongoose';

const emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 40
  },
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
    required: [true, 'Email required'],
    maxlength: 100
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password required'],
    maxlength: 200
  },
  status: {
    type: Number,
    enum: [0, 1],
    required: true,
    trim: true
  },
  avatar: {
    path: String,
    url: String
  },
  site: {
    type: Schema.Types.ObjectId,
    ref: 'Site'
  },
  verifyTime: {
    type: Date,
    expires: 60 * 60 * 24
  }
});

export default mongoose.model('User', schema);
