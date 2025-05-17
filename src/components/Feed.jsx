import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserChard from "./UserChard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log("err.message", err.message);
    }
  };

  useEffect(() => {
    getFeed();

    const interval = setInterval(() => {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3 * 1000);
    }, 10 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (!feed) return null;

  return (
    <div className="relative flex justify-center items-center mt-10 px-4 min-h-[50vh]">
      {/* Toast Container */}
      {showToast && (
        <div className="toast toast-end absolute top-4 right-4 z-50">
          <div className="alert alert-success">
            <span>Every day meet with New Coders</span>
          </div>
        </div>
      )}

      {feed && feed.length > 0 ? (
        <UserChard user={feed[0]} />
      ) : (
        <div className="text-center text-gray-500 text-lg">
          No users to display at the moment.
        </div>
      )}
    </div>
  );
};

export default Feed;
