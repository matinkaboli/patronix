import mongoose, { Schema } from 'mongoose';

let schema = new Schema({
  link: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 12
  }
});

export default mongoose.model('RecoveryLink', schema);