import mongoose from 'mongoose';
import {User} from './models/users.js';
import {UserStats} from './models/userStats.js';
import {UpcomingContest} from './models/upcomingContests.js';
import { connectClient } from "./config/mongodb_config.js";

async function seed() {
  try {
    await connectClient();
    console.log('Connected to MongoDB');
    await User.deleteMany({});
    await UserStats.deleteMany({});
    await UpcomingContest.deleteMany({});

    // Insert Users
    const users = await User.insertMany([
      {
        username: 'Deekshitha Vemula',
        email: 'deeks@example.com',
        password: '$2a$10$hashedPasswordHere', // Replace with actual hashed password
        handles: {
          codeforces: 'deeks_cf',
          leetcode: 'deeks_lc',
          codechef: 'deeks_cc',
        }
      },
      {
        username: 'Raj Kumar',
        email: 'raj@example.com',
        password: '$2a$10$hashedPasswordHere',
        handles: {
          codeforces: 'rajkumar_cf',
          leetcode: 'rajkumar_lc'
        }
      }
    ]);

    console.log('Users inserted');

    // Insert UserStats
    const userStats = await UserStats.insertMany([
      {
        userId: users[0]._id,
        platform: 'codeforces',
        rating: 1450,
        problemsSolved: 120,
        accuracy: 82.5
      },
      {
        userId: users[0]._id,
        platform: 'leetcode',
        rating: 1850,
        problemsSolved: 340,
        accuracy: 76.0
      }
    ]);

    console.log('UserStats inserted');

    // Insert Upcoming Contests
    await UpcomingContest.insertMany([
      {
        platform: 'codeforces',
        contestName: 'Codeforces Round #950 (Div. 2)',
        startTime: new Date('2025-06-08T14:35:00Z'),
        duration: 120,
        contestLink: 'https://codeforces.com/contest/1901'
      },
      {
        platform: 'leetcode',
        contestName: 'LeetCode Weekly Contest 400',
        startTime: new Date('2025-06-09T02:30:00Z'),
        duration: 90,
        contestLink: 'https://leetcode.com/contest/weekly-contest-400'
      },
      {
        platform: 'codechef',
        contestName: 'CodeChef June Long Challenge',
        startTime: new Date('2025-06-10T17:00:00Z'),
        duration: 180,
        contestLink: 'https://www.codechef.com/JUNE25'
      }
    ]);

    console.log('UpcomingContests inserted');

    // Close connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seed();
