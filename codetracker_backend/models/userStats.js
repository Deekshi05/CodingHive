import mongoose from 'mongoose';

const userStatsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  platform: { type: String, required: true },

  rating: { type: Number },
  problemsSolved: { type: Number },
  accuracy: { type: Number },
  lastFetched: { type: Date, default: Date.now }
});

userStatsSchema.index({ userId: 1, platform: 1 }, { unique: true });

export const UserStats= mongoose.model('UserStats', userStatsSchema);

