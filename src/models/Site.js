import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  operators: [
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
