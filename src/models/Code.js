import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  code: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  createdAt: {
    type: Date,
    expires: 60 * 60 * 5,
    default: Date.now
  }
});

export default mongoose.model('Code', schema);
