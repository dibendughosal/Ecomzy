import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-gray-600">
        <h2 className="text-2xl mb-4">You are not logged in.</h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Login Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Name</h2>
          <p className="text-gray-700">{user.name}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Email</h2>
          <p className="text-gray-700">{user.email}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Account ID</h2>
          <p className="text-gray-700">{user.id || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
