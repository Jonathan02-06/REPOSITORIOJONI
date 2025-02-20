import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los usuarios del backend
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de eliminar este usuario?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (res.ok) {
          alert(data.message);
          fetchUsers(); 
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("Error en la conexión al servidor");
      }
    }
  };

  return (
    <Layout>
      <div className="users-container">
        <h2>Usuarios Registrados</h2>
        {loading ? (
          <p>Cargando usuarios...</p>
        ) : (
          <ul className="users-list">
            {users.map((user) => (
              <li key={user._id} className="user-item">
                <p>
                  <strong>Usuario:</strong> {user.username}
                </p>
                <p>
                  <strong>Correo:</strong> {user.email}
                </p>
                <button onClick={() => handleDelete(user._id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default Users;
