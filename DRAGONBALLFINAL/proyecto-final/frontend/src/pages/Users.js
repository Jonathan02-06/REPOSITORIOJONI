import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import useLocalStorage from "../hooks/useLocalStorage";
import "./Users.css";

const Users = () => {
  
  const [users, setUsers] = useLocalStorage("users", []);
  const [form, setForm] = useState({ id: null, name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setUsers(users.map(u => (u.id === form.id ? form : u)));
      setIsEditing(false);
    } else {
      const newUser = { ...form, id: Date.now() };
      setUsers([...users, newUser]);
    }
    setForm({ id: null, name: "", email: "" });
  };

  const handleEdit = (user) => {
    setForm(user);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <Layout>
      <h2>Gestión de Usuarios</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isEditing ? "Actualizar" : "Agregar"}</button>
      </form>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            <span>{user.name} ({user.email})</span>
            <div>
              <button onClick={() => handleEdit(user)}>Editar</button>
              <button onClick={() => handleDelete(user.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Users;
