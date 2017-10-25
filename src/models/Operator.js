import mongoose, { Schema } from 'mongoose';

const fullName = new Schema({
  first: {
    type: String,
    trim: true
  },
  last: {
    type: String,
    trim: true
  }
});

const schema = new Schema({
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
  name: fullName
});

export default mongoose.model('Operator', schema);
