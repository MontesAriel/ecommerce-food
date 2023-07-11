import React, { createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../../firebase/firebase";

// Crea el contexto de FoodContext
export const FoodContext = createContext({
    foods: [],
    searchQuery: "",
    updateSearchQuery: () => {}
  });

// Crea el componente proveedor del contexto
export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "foods"));
        const fetchedFoods = querySnapshot.docs.map((doc) => doc.data());
        setFoods(fetchedFoods);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    fetchFoods();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.description !== product.description);
    setCart(updatedCart);
  };


  return (
    <FoodContext.Provider value={{foods, addToCart, cart, removeFromCart, calculateSubtotal}}>
      {children}
    </FoodContext.Provider>
  );
};
