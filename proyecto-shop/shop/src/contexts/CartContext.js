import React, { createContext, useReducer, useEffect } from 'react';

// Estado inicial del carrito: lee desde localStorage o usa array vacío
const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Si el producto ya existe, se incrementa la cantidad
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    }
    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Guardamos el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ cart: state.items, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
