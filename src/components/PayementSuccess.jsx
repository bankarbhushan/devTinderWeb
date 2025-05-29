import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const PayementSuccess = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user?.firstName || "User");
  const naviagte = useNavigate();

  useEffect(() => {
    const modal = document.getElementById("my_modal_4");
    if (modal) {
      modal.showModal();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      naviagte("/");
    }, 2000);
  }, []);

  return (
    <div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-2xl p-6 text-center">
          {/* Success GIF or Sticker */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaBbu6ZGqKq8sVQDjU90HGXZ2wNKhTid5JPA&s"
            alt="Payment Success"
            className="w-60 h-40 mx-auto rounded-md mb-4"
          />

          <h3 className="font-bold text-2xl text-green-600">
            Payment Successful!
          </h3>
          <p className="text-lg mt-2">
            Thank you, <strong>{firstName}</strong>, for your payment. 🎉
          </p>
          <p className="py-2">We’ve received your transaction successfully.</p>
        </div>
      </dialog>
    </div>
  );
};

export default PayementSuccess;
