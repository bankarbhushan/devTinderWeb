import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const request = useSelector((store) => store.request);

  const dispatch = useDispatch();
  const getRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      // console.log("request", res?.data?.data);
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log("err.message", err.message);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      // i am sending the id to remove the cardS
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.log("err.message", err.message);
    }
  };

  if (!request) return;
  if (request.legth === 0) return <h1> No Request found</h1>;

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h1 className="text-3xl text-center font-bold my-6">
        Connection Request
      </h1>

      {request.map((request) => {
        const { _id, firstName, lastName, age, gender, about, photoUrl } =
          request?.fromUserId;
        return (
          <div className="w-full md:w-4/5 lg:w-3/5 mx-auto" key={_id}>
            <div className="bg-slate-900 text-white rounded-xl shadow-lg p-4 mb-6 flex flex-col md:flex-row items-center gap-4">
              <img
                src={photoUrl}
                alt="User"
                className="w-20 h-20 rounded-full object-cover bg-red-300"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-semibold">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-gray-300 mt-1">{`${age}, ${gender}`}</p>
                )}
                <p className="text-gray-400 mt-1">{about}</p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => reviewRequest("rejected", request._id)}
                  className="px-4 py-2 text-sm bg-red-600 cursor-pointer hover:bg-red-700 rounded-md transition"
                >
                  Reject
                </button>
                <button
                  onClick={() => reviewRequest("accepted", request._id)}
                  className="px-4 py-2 text-sm cursor-pointer bg-green-600 hover:bg-green-700 rounded-md transition"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
