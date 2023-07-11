import React, { useContext, useState } from "react";
import { FoodContext } from "./ProductsContext";

const Card = (props) => {
  
  const { img, description, price, inventory } = props;

  
  const { addToCart } = useContext(FoodContext);

  const handleClickCar = () => {
    const product = {
      img,
      description,
      price,
      inventory: inventory - 1
    };
    addToCart(product); // Agrega el producto al carrito
  };

  return (
    <div style={{height:'280px'}} className="bg-[#1F1D2B] rounded-xl flex flex-col items-center gap-2 text-center text-gray-300">
      <img
        src={img}
        className="w-40 h-40 object-cover -mt-20 shadow-2xl rounded-full"
      />
      <p className="text-xl p-2">{description}</p>
      <span className="text-gray-400">${price}</span>
      <p className="text-gray-600">{inventory} Bowls available</p>
      <button style={{marginTop:"auto"}} onClick={handleClickCar} className="bg-[#ec7c6a] w-full py-2 px-4 rounded-lg">
            Añadir al 🛒
      </button>
    </div>
  );
};

export default Card;
