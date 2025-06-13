// src/components/LeetCodePOTD.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLink } from "react-icons/fa";
import axios from "axios";

const Potdcomponent = () => {
  const [potdLink, setPotdLink] = useState("");

  useEffect(() => {
    const fetchPOTD = async () => {
      try {
       const response = await axios.get('https://leetcode-api-pied.vercel.app/daily');
    const data = response.data;
    const fullUrl = `https://leetcode.com${data.link}`;
        setPotdLink(fullUrl);
      } catch (error) {
        console.error("Error fetching POTD:", error.message);
      }
    };
    fetchPOTD();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <motion.div
        className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-4 text-blue-400">📌 LeetCode POTD</h1>
        {potdLink ? (
          <a
            href={potdLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg text-yellow-400 hover:underline hover:text-yellow-300 transition"
          >
            <FaLink className="text-xl" />
            View Problem of the Day
          </a>
        ) : (
          <p className="text-gray-400">Loading...</p>
        )}
      </motion.div>
    </div>
  );
};

export default Potdcomponent;
