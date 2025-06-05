
import mongoose from 'mongoose';

const userPlatformSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  
      required: true
    },
    platformName: {
      type: String,
      required: true,
    },
    platformHandle: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const userPlatform = mongoose.model('userPlatform', userPlatformSchema);

export default userPlatform;
