import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addconnection } from "../utils/connectionsSlice";

const Connection = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const getConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      console.log("connecction", res.data);

      dispatch(addconnection(res?.data));
    } catch (err) {
      console.log("err.message", err.message);
    }
  };

  useEffect(() => {
    getConnection();
  }, []);

  if (!connections) return;
  if (connections.legth === 0)
    return (
      <h1 className="text-center mt-20 text-red-500"> No Connection found</h1>
    );

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h1 className="text-3xl text-center font-bold my-6">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, about, photoUrl } =
          connection;
        return (
          <div className="w-full md:w-4/5 lg:w-3/5 mx-auto" key={_id}>
            <div className="bg-slate-900 text-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row items-center gap-4">
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
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
