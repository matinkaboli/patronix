import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  type: {
    type: String,
    enum: ['png', 'jpeg', 'jpg']
  },
  name: String
});

export default mongoose.model('File', schema);
