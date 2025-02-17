import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import "./ManageProducts.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", price: "", image: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedProducts = localStorage.getItem("adminProducts");
    if (storedProducts) setProducts(JSON.parse(storedProducts));
  }, []);

  useEffect(() => {
    localStorage.setItem("adminProducts", JSON.stringify(products));
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts(products.map(p => (p.id === form.id ? form : p)));
      setIsEditing(false);
    } else {
      const newProduct = { ...form, id: Date.now() };
      setProducts([...products, newProduct]);
    }
    setForm({ id: null, name: "", price: "", image: "" });
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <Layout>
      <h2>Gestión de Productos</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input type="text" name="name" placeholder="Nombre del producto" value={form.name} onChange={handleInputChange} required />
        <input type="number" name="price" placeholder="Precio" value={form.price} onChange={handleInputChange} required />
        <input type="text" name="image" placeholder="URL de la imagen" value={form.image} onChange={handleInputChange} required />
        <button type="submit">{isEditing ? "Actualizar" : "Agregar"}</button>
      </form>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
            <div className="product-actions">
              <button onClick={() => handleEdit(product)}>Editar</button>
              <button onClick={() => handleDelete(product.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default ManageProducts;
