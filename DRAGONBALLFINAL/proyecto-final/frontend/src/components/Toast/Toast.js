import React, { useContext } from "react";
import { ToastContext } from "../../contexts/ToastContext";
import "./Toast.css";

const Toast = () => {
  const { message, type } = useContext(ToastContext);
  if (!message) return null;
  return <div className={`toast toast-${type}`}>{message}</div>;
};

export default Toast;
