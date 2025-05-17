import React, { useEffect, useState } from "react";

const Toast = () => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      {showToast && (
        <div className="toast toast-end">
          <div className="alert alert-success">
            <span>Every day meet with New Coders</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toast;
