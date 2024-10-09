import React, { useState } from "react";
import { useProductCon } from "../context/ProductContext";
import CartCard from "../component/CartCard";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { items, setItems, removeItem } = useProductCon();
  const navigate = useNavigate();

  const handleClick = (id, quantity) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    setItems(newItems);
  };

  const getPriceOfCart = (item) => {
    const value = item.reduce((val, pro) => {
      return val + pro.price * pro.quantity;
    }, 0);
    return value.toFixed(2);
  };

  return (
    <>
      <div className="flex justify-center mt-10 h-[70vh]">
        {items.length === 0 && <div className="h-full w-full flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold">Your cart is empty</h2>
            <button className="bg-blue-800 text-white rounded-lg mt-2 px-2 py-2" onClick={()=> navigate("/")}>
              Shop now
            </button>
        </div>}
        {items.length > 0 && <div className="w-[70%] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.length > 0 &&
            items?.map((item, index) => (
              <CartCard
                key={index}
                item={item}
                handleClick={handleClick}
                removeItem={removeItem}
              />
            ))}
        </div>}
        <div
          className="text-white h-[8vh] w-full bottom-0 fixed bg-black shadow px-5"
          style={{ marginTop: "6px" }}
        >
          <div className="flex justify-between items-center h-full">
            <div>
              <p className="">Total items: {items.length}</p>
            </div>
            <div className="flex justify-end items-center h-full">
              Total cart value: ${getPriceOfCart(items)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
