import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import axiosClient from "../../axiosclient";
import { toast } from "react-toastify";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    return decodedPayload.userId || null;
  } catch {
    return null;
  }
};

const HandleEditor = ({ handles, setHandles }) => {
  const [editMode, setEditMode] = useState({});
  const [localHandles, setLocalHandles] = useState({ ...handles });
  const [saving, setSaving] = useState({});
  const userId = getUserIdFromToken();

  const handleChange = (platform, value) => {
    setLocalHandles((prev) => ({ ...prev, [platform]: value }));
  };

  const handleEditClick = (platform) => {
    setEditMode((prev) => ({ ...prev, [platform]: true }));
  };

  const handleSaveClick = async (platform) => {
    try {
      setSaving((prev) => ({ ...prev, [platform]: true }));
      const updatedHandle = localHandles[platform];

      await axiosClient.patch(`/${userId}/handle`, {
        platform,
        handle: updatedHandle,
      });

      setHandles((prev) => ({ ...prev, [platform]: updatedHandle }));
      setEditMode((prev) => ({ ...prev, [platform]: false }));

      toast.success(`${platform} handle updated successfully!`);
    } catch (err) {
      console.error("Error saving handle:", err);
      toast.error("Failed to update handle.");
    } finally {
      setSaving((prev) => ({ ...prev, [platform]: false }));
    }
  };

  return (
    <section className="py-16 bg-[#0f172a] text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          🔧 Edit Platform Handles
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          {Object.entries(localHandles).map(([platform, handle]) => (
            <div
              key={platform}
              className="bg-[#111827] border border-white/10 p-4 rounded-xl shadow-lg hover:shadow-blue-500/20 transition duration-300"
            >
              <label className="text-gray-300 block mb-1 text-sm">
                {platform}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => handleChange(platform, e.target.value)}
                  readOnly={!editMode[platform]}
                  className={`w-full bg-gray-800 text-white p-1.5 text-sm rounded-lg border transition duration-200 ${
                    editMode[platform]
                      ? "border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      : "border-gray-700"
                  }`}
                />
                {editMode[platform] ? (
                  <button
                    onClick={() => handleSaveClick(platform)}
                    disabled={saving[platform]}
                    className="text-green-400 hover:text-green-500"
                    title="Save"
                  >
                    <FaSave size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(platform)}
                    className="text-yellow-400 hover:text-yellow-500"
                    title="Edit"
                  >
                    <FaEdit size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HandleEditor;
