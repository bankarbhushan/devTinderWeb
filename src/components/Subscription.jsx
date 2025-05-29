import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const navigate = useNavigate();
  const handleOrder = async (type) => {
    try {
      const response = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, notes, orderId, currency } = response.data;

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: amount,
        currency: currency,
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: notes.email || "", // Make sure email is included
        },
        theme: {
          color: "#F37254",
        },
      };
      navigate("/paymentsucess");

      // const rzp = new window.Razorpay(options);
      // rzp.open();
    } catch (err) {
      navigate("/paymentsucess");
    }
  };

  return (
    <div className="m-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-primary">Choose Your Plan</h2>

        <p className="text-gray-500 mt-2">
          Upgrade for more features and visibility!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 ">
        {/* Silver Plan */}
        <div className="card bg-base-200 shadow-xl rounded-box p-6 w-full lg:w-1/2 border border-white-400">
          <h1 className="text-2xl font-semibold text-center mb-4">
            🥈 Silver Plan
          </h1>
          <ul className="list-disc list-inside space-y-2 text-white-700">
            <li>✅ Get 100 Requests Every Day</li>
            <li>✅ Blue Tick for 3 Months</li>
            <li>✅ Access to Basic Analytics</li>
          </ul>
          <div className="mt-6 text-center">
            <button
              className="btn btn-outline btn-primary"
              onClick={() => handleOrder("silver")}
            >
              Choose Silver
            </button>
          </div>
        </div>

        <div className="divider lg:divider-horizontal hidden lg:flex">OR</div>

        {/* Gold Plan */}
        <div className="card bg-base-200 shadow-xl rounded-box p-6 w-full lg:w-1/2 border-2 border-yellow-400">
          <h1 className="text-2xl font-semibold text-center mb-4">
            🥇 Gold Plan
          </h1>
          <ul className="list-disc list-inside space-y-2 text-white-700">
            <li>🚀 Unlimited Requests Every Day</li>
            <li>💎 Blue Tick for 1 Year</li>
            <li>📈 Advanced Analytics & Priority Support</li>
            <li>🎯 Featured on Home Page</li>
          </ul>
          <div className="mt-6 text-center">
            <button
              className="btn btn-primary"
              onClick={() => handleOrder("gold")}
            >
              Choose Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
