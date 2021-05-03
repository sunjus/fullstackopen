import React from "react";

const Notification = ({ message: { msg, type } }) => {
  //console.log(message);

  if (msg === "") {
    return null;
  }
  return (
    <div className={type === "error" ? "error" : "notification"}>{msg}</div>
  );
};

export default Notification;
