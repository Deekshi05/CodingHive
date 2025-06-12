import mongoose from "mongoose";

const contestDiscussionSchema = new mongoose.Schema({
  contestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UpcomingContest", // reference to the contest
    required: true,
    unique: true,
  },
  youtubeLinks: {
    type: [String], // array of YouTube URLs
    validate: [arrayLimit, '{PATH} exceeds the limit of 3'],
  },
  lastFetched: {
    type: Date,
    default: Date.now,
  },
});

function arrayLimit(val) {
  return val.length <= 3;
}

export const ContestDiscussion = mongoose.model(
  "ContestDiscussion",
  contestDiscussionSchema
);
