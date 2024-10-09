import React from "react";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";

function CartCard({ item, handleClick, removeItem }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="card h-[250px] flex items-center mx-auto flex-col p-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
        style={{ width: "-webkit-fill-available" }}
      >
        <div className="flex items-center p-2 flex-col" onClick={()=> navigate(`/${item.id}`)}>
          <div>
            <img
              src={item.image}
              alt={item.image}
              className="h-[100px] w-[100px]"
              style={{ overflow: "hidden" }}
            />
          </div>
          <div className="ml-3">
            <h1 className="w-full text-xl font-bold break-all h-[28px] overflow-hidden">
              {item.title.length > 25
                ? item.title.slice(0, 22) + "..."
                : item.title}
            </h1>
          </div>
        </div>
        <div className="px-2 w-full">
          <div className="flex justify-between items-center flex-col">
          <div className="flex items-center">
            <span className="font-bold text-lg px-3 py-1 rounded-full text-green-600">
              ${item.price}
            </span>
            <span className="font-bold">X</span>
            <div className="mx-3">
              <Dropdown
                id={item.id}
                quantity={item.quantity}
                handleClick={handleClick}
              />
            </div>
            
          </div>
          <div className="flex p-2 justify-between w-full items-end">
          <div>
              <span>=</span>
              <span className="font-bold text-xl mx-2">
                ${item.price * item.quantity}
              </span>
            </div>
            <span className="underline text-red-500 text-sm" onClick={()=>removeItem(item.id)}>remove</span>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartCard;
