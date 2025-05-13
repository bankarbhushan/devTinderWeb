import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserChard from "./UserChard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  // console.log("feed", feed);

  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      // if already feed daata exist return from here dont make an apicall
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      // setup the feed data into the redux store
      dispatch(addFeed(res?.data?.data));
      // console.log("feed", res?.data?.data);
    } catch (err) {
      console.log("err.message", err.message);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  return (
    <div className="flex justify-center items-center mt-10 px-4 min-h-[50vh]">
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
