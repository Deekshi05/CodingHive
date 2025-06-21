import mongoose from 'mongoose';

const upcomingContestSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  contestName: { type: String, required: true },
  startTime: { type: Date, required: true },
  duration: { type: Number },
  contestLink: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

export const UpcomingContest= mongoose.model('UpcomingContest', upcomingContestSchema);

