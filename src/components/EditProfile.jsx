import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserChard from "./UserChard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  // console.log(" edit user", user);

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setphotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

  const updateProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about },
        { withCredentials: true }
      );
      setSuccess(res?.data?.message);

      setTimeout(() => {
        setSuccess("");
      }, 3000);
      // console.log("res.data", res.data);

      // i will update the store with this information
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      console.log("err", err?.response?.data);
      setError(err?.response?.data);
    }
  };
  return (
    <div className="px-4">
      {/* Success toast */}
      {success && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-success shadow-lg">
            <span>{success}</span>
          </div>
        </div>
      )}

      {/* Main layout */}
      <div className="flex flex-col md:flex-row justify-center gap-10 w-full my-10 items-start">
        {/* Profile update card */}
        <div className="bg-slate-900 text-white w-full max-w-md rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Profile Update
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input
                type="number"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">About</label>
              <textarea
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Tell us about yourself..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Photo URL
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={photoUrl}
                onChange={(e) => setphotoUrl(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-2 rounded-md font-semibold transition"
              onClick={updateProfile}
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* Preview User card */}
        <div className="w-full max-w-md">
          <UserChard
            user={{ firstName, lastName, age, gender, photoUrl, about }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
