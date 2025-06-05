import mongoose from 'mongoose';

const platformSchema = new mongoose.Schema({
  platformName: {
    type: String,
    required: true,
    unique: true,   
    trim: true
  },
  profileApi: {
    type: String,
    required: true,
    trim: true
  },
  contestApi: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const Platform = mongoose.model('Platform', platformSchema);

export default Platform;
