import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserChard = (user) => {
  // console.log("user?.user", user);

  const dispatch = useDispatch();

  const { _id, firstName, lastName, age, about, gender, photoUrl } = user.user;

  const handleSendRequest = async (status, toUserId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + toUserId,
        {},
        { withCredentials: true }
      );

      dispatch(removeFeed(toUserId));
    } catch (err) {
      console.log("err.message", err.message);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="bg-slate-900 text-white rounded-xl shadow-lg w-full max-w-sm overflow-hidden transition-transform hover:scale-[1.02] duration-300">
        <figure className="w-full h-90 overflow-hidden">
          <img
            src={photoUrl}
            alt="User Photo"
            className="w-full h-full object-cover object-center"
          />
        </figure>
        <div className="p-4">
          <h2 className="text-xl font-bold flex flex-wrap items-center gap-2">
            {firstName + " " + lastName}
            {age && (
              <span className="badge bg-purple-600 text-white">{age}</span>
            )}
            {gender && (
              <span className="badge bg-blue-600 text-white">{gender}</span>
            )}
          </h2>
          {about && <p className="text-gray-300 mt-2">{about}</p>}

          <div className="flex justify-center gap-4 mt-5">
            <button
              onClick={() => handleSendRequest("ignored", _id)}
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer px-4 py-2 rounded-md transition"
            >
              Ignore
            </button>
            <button
              onClick={() => handleSendRequest("interested", _id)}
              className="bg-green-600 hover:bg-green-700 cursor-pointer  text-white px-4 py-2 rounded-md transition"
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChard;
