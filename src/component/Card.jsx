import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { useProductCon } from "../context/ProductContext";

function Card({ item }) {
  const navigate = useNavigate();
  const { handleCart } = useProductCon();

  const handleCardClick = (item) => {
    navigate(`/${item.id}`);
  };

  return (
    <div
      className="card h-auto flex items-center mx-auto flex-col p-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
      style={{ width: "-webkit-fill-available" }}
    >
      <div className="flex justify-center flex-col items-center" onClick={() => handleCardClick(item)}>
        <div>
          <img
            src={item.image}
            alt={item.image}
            className="h-[250px] w-[280px]"
            style={{ overflow: "hidden" }}
          />
        </div>
        <div className="px-4 pt-4">
          <h1 className="w-full text-xl font-bold break-all h-[28px] overflow-hidden">
            {item.title.length > 25
              ? item.title.slice(0, 22) + "..."
              : item.title}
          </h1>
          <p className="text-md break-all max-h-[50px] overflow-hidden">
            {item.description.length > 55
              ? item.description.slice(0, 52) + "..."
              : item.description}
          </p>
          <div className="mt-1 h-[40px] overflow-hidden">
            <Rating rate={item.rating.rate} count={item.rating.count} />
          </div>
        </div>
      </div>
      <div className=" flex justify-between w-full px-4">
        <span className="font-bold text-lg bg-green-200 px-3 py-1 rounded-full text-green-600">
          ${item.price}
        </span>
        <button className="bg-black text-white p-1 rounded-full text-sm px-3" onClick={()=> handleCart(item, 1)}>
          Buy now
        </button>
      </div>
    </div>
  );
}

export default Card;
