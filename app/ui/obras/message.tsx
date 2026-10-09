"use client";
import React from "react";

const Message = ({ onClose }: { onClose: () => void }) => {
  return <button onClick={onClose}>Close</button>;
};

export default Message;
