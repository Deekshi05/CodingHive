import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaThumbtack } from "react-icons/fa";
import axios from "axios";

const Potdcomponent = () => {
  const [potdLink, setPotdLink] = useState("");

  useEffect(() => {
    const fetchPOTD = async () => {
      try {
        const response = await axios.get("https://leetcode-api-pied.vercel.app/daily");
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
    <motion.div
      className="rounded-2xl w-full max-w-sm mx-auto px-6 py-4 bg-[#1e253b]/80 backdrop-blur-lg shadow-xl border border-[#2b324b] mt-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <FaThumbtack className="text-pink-500" />
        <h2 className="text-base sm:text-lg font-semibold text-white">
          LeetCode Problem of the Day
        </h2>
      </div>

      {potdLink ? (
        <a
          href={potdLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-400 hover:underline hover:text-blue-300 transition"
        >
          View on LeetCode →
        </a>
      ) : (
        <p className="text-sm text-gray-400 italic">Loading...</p>
      )}
    </motion.div>
  );
};

export default Potdcomponent;
