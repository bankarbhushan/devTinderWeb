import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          // the data is sending from the backedn so that we have to configure with the frontend as well
        }
      );
      // dispatch(addUser(res.data));
      if (res) {
        dispatch(addUser(res.data));
      }
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.error);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      // console.log("usersigup", res.data);
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      console.log("err.message", err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 px-4">
      <div className="w-full max-w-md bg-slate-900 text-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <div className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="mt-6">
            <button
              onClick={isLogin ? handleLogin : handleSignup}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-md text-lg font-semibold"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>

        <p
          className="mt-6 text-center text-sm text-gray-400 cursor-pointer hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New user? Create an account"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Login;
