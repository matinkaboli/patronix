import mongoose, { Schema } from 'mongoose';

const operatorSchema = new Schema({
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
  }
});

export default mongoose.model('Operator', operatorSchema);
