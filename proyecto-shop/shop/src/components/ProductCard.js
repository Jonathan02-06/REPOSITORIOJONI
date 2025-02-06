// src/components/ProductCard.js
import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export const ProductCard = ({ product }) => {
  const { dispatch } = useContext(CartContext);

  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '1rem',
      padding: '1rem',
      margin: '1rem',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
      width: '250px',
      textAlign: 'center'
    }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <button onClick={addToCart}>Agregar al carrito</button>
    </div>
  );
};
