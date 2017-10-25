import mongoose, { Schema } from 'mongoose';

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
  name: {
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
  }
});

export default mongoose.model('Operator', schema);
