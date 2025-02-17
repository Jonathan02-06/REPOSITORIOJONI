import React, { useContext } from "react";
import { ToastContext } from "../../contexts/ToastContext";
import "./Toast.css";

const Toast = () => {
  const { toast } = useContext(ToastContext);

  if (!toast.message) return null;

  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.message}
    </div>
  );
};

export default Toast;
