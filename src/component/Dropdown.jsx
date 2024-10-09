import React, { useState } from "react";

function Dropdown({id, quantity, handleClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const hanldeOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative">
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-black bg-white border focus:outline-none 0 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex justify-between items-center w-auto"
          type="button"
          onClick={hanldeOpen}
        >
          {" "}
          {quantity}{" "}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="black"
              sstrokelinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdown"
          className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-[65px] dark:bg-gray-700  overflow-y-auto h-40 ${
            isOpen ? "block" : "hidden"
          } absolute`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <button
                onClick={()=>{ hanldeOpen(); handleClick(id, 1)}}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                1
              </button>
            </li>
            <li>
              <button
                onClick={()=>{ hanldeOpen(); handleClick(id, 2)}}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                2
              </button>
            </li>
            <li>
              <button
                onClick={()=>{ hanldeOpen(); handleClick(id, 3)}}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                3
              </button>
            </li>
            <li>
              <button
                onClick={()=>{ hanldeOpen(); handleClick(id, 4)}}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                4
              </button>
            </li>
            <li>
              <button
                onClick={()=>{ hanldeOpen();handleClick(id, 5)}}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                5
              </button>
            </li>
            <li>
              <button
                onClick={()=>{ hanldeOpen();handleClick(id, 6)}}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                6
              </button>
            </li>
            <li>
              <button
                onClick={()=>{ hanldeOpen();handleClick(id, 7)}}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                7
              </button>
            </li>
            <li>
              <button
                onClick={()=>{ hanldeOpen();handleClick(id, 8)}}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                8
              </button>
            </li>
            <li>
              <button
                onClick={()=>{ hanldeOpen();handleClick(id, 9)}}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                9
              </button>
            </li>
            <li>
              <button
                onClick={()=>{ hanldeOpen();handleClick(id, 10)}}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                10
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Dropdown;
