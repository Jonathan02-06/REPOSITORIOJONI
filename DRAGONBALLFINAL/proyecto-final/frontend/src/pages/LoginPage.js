import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import useForm from "../hooks/useForm";
import Layout from "../components/layout/Layout";
import "./LoginPage.css";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { values, handleInputChange, resetForm } = useForm({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(values);
    if (response.success) {
      navigate("/");
    } else {
      alert(response.error);
      resetForm();
    }
  };

  return (
    <Layout>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Iniciar Sesión</h2>
          <input type="text" name="username" placeholder="Usuario" value={values.username} onChange={handleInputChange} required />
          <input type="password" name="password" placeholder="Contraseña" value={values.password} onChange={handleInputChange} required />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
