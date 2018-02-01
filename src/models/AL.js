/**
 * AL == ActivationLink
 */

import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true
  },
  createdAt: {
    type: Date,
    expires: 60 * 60 * 24,
    default: Date.now
  }
});

export default mongoose.model('ActivationLink', schema);
