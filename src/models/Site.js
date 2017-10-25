import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  link: {
    type: String,
    unique: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  operator: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Operator'
    }
  ],
  status: {
    type: Number,
    enum: [1, 2, 3],
    required: true
  }
});

export default mongoose.model('Site', schema);
