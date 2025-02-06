// src/pages/HomePage.js
import React from 'react';
import { ProductCard } from '../components/ProductCard';

const sampleProducts = [
  { id: 1, name: 'Producto 1', description: 'Descripción del producto 1' },
  { id: 2, name: 'Producto 2', description: 'Descripción del producto 2' },
];

export const HomePage = () => {
  return (
    <div className="container">
      <h1>Bienvenido a la Tienda</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
