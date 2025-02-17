import React, { createContext, useReducer } from "react";

export const ToastContext = createContext();

const initialState = { message: "", type: "" };

const toastReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_TOAST":
      return { message: action.payload.message, type: action.payload.type };
    case "HIDE_TOAST":
      return { message: "", type: "" };
    default:
      return state;
  }
};

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const showToast = (message, type = "success") => {
    dispatch({ type: "SHOW_TOAST", payload: { message, type } });
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast: state, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};
