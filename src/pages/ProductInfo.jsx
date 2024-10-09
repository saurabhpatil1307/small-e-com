import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductCon } from "../context/ProductContext";
import { ArrowLeft } from "../assets/svgs/svg";

function ProductInfo() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()

  const { setItems, items, handleCart } = useProductCon();

  const fetchPage = async (id) => {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return res;
  };
  const { isError, isLoading, data } = useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchPage(id),
    staleTime: Infinity,
  });

  

  const handleAdd = () => {
    if (quantity <= 9) {
      setQuantity((prev) => prev + 1);
    }
  };
  const handleRemove = () => {
    if (quantity >= 2) {
      setQuantity((prev) => prev - 1);
    }
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="flex justify-center mt-10 flex-col items-center">
      <div className="w-[90%] my-5 flex items-center">
        <button className="h-full mr-2 bg-blue-200 rounded-lg p-2" onClick={()=> navigate("/")}><ArrowLeft/></button>
        <p>{data?.data?.category}</p>
      </div>
      <div className="w-[90%] gap-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
        <div className="flex justify-center">
          <img src={data?.data?.image} alt="" className="h-[70vh] mt-5" />
        </div>
        <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2">
          <h1 className="text-3xl mt-1">{data?.data?.title}</h1>
          <p className="text-lg mt-16">{data?.data?.description}</p>
          <h1 className="mt-4 font-bold text-lg">
            Price: ${data?.data?.price}
          </h1>
          <div className="mt-5">
            <form className="max-w-xs">
              <label
                htmlFor="quantity-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Choose quantity:
              </label>
              <div className="relative flex items-center max-w-[8rem]">
                <button
                  type="button"
                  id="decrement-button"
                  data-input-counter-decrement="quantity-input"
                  className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  onClick={handleRemove}
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      sstrokelinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  id="quantity-input"
                  data-input-counter
                  aria-describedby="helper-text-explanation"
                  className="focus:outline-none border border-gray-300 p-3 h-11 w-[55px] text-center"
                  placeholder="1"
                  value={quantity}
                  readOnly
                  required
                />
                <button
                  type="button"
                  id="increment-button"
                  data-input-counter-increment="quantity-input"
                  className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  onClick={handleAdd}
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      sstrokelinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
            </form>

            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
              onClick={() => handleCart(data?.data, quantity)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
