import mongoose, { Schema } from 'mongoose';

const siteSchema = new Schema({
  link: {
    type: String,
    unique: true
  },
  owner: {

  },
  operator: {
  },
  status: {
    type: Number,
    enum: [1, 2, 3],
    trim: true,
    required: true
  }
});

export default mongoose.model('Site', siteSchema);
