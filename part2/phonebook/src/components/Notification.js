import React from "react";

const Notification = ({ errorMessage }) => {
  console.log(errorMessage);
  if (errorMessage === null) {
    return null;
  }
  return <div className="error">{errorMessage}</div>;
};

export default Notification;
