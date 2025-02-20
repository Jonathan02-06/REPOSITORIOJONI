
import React, { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const initialState = { user: null };

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState, () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? { user: JSON.parse(storedUser) } : initialState;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const login = async ({ username, password }) => {
    
    const normalizedUsername = username.toLowerCase();
    
    if (normalizedUsername === "jonathan" && password === "1234") {
      const userData = { username: normalizedUsername, token: "dummy-token" };
      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
      return { success: true };
    } else {
      return { success: false, error: "Credenciales inválidas" };
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
