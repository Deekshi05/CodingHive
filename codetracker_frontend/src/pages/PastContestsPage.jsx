// pages/PastContestsPage.jsx
import React, { useEffect, useState } from 'react';
import ContestDiscussionCard from '../components/ContestDiscussionCard.jsx';
import axiosClient from "../axiosclient.js";
import { FaRegCalendarAlt } from 'react-icons/fa';

const PastContestsPage = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axiosClient.get('/past-contests');
        setContests(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch contests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
  <FaRegCalendarAlt className="text-blue-500" />
  Past Contests & Discussions
</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading contests...</p>
      ) : contests.length === 0 ? (
        <p className="text-center text-gray-500">No contests available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest, index) => (
            <ContestDiscussionCard key={index} contest={contest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PastContestsPage;
