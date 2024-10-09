import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProductCon } from "../context/ProductContext";

function Navbar() {
  const { setSearchT, setShowSide, items } = useProductCon();
  const [showNav, setShowNav] = useState(true);
  const location = useLocation();

  const handleChange = (e) => {
    setSearchT(e.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowSide(false);
      } else {
        setShowSide(true);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="bg-blue-200 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {location.pathname == "/" && <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className={`md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1`}
            onClick={() => setShowSide((prev) => !prev)}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                sstrokelinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>}
          <div className="flex md:order-2">
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    sstrokelinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                onChange={handleChange}
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
              onClick={() => setShowNav((prev) => !prev)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  sstrokelinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
              showNav ? "hidden" : "block"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    sstrokelinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                onChange={handleChange}
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  onClick={() => setShowNav((prev) => !prev)}
                  className={`block py-2 px-3 bg-blue-700 rounded md:bg-transparent ${
                    location.pathname === "/"
                      ? "md:text-blue-700"
                      : "text-black"
                  } md:p-0
                  ${
                    location.pathname === "/" ? "bg-white" : "bg-transparent"
                  } md:dark:text-blue-500`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  onClick={() => setShowNav((prev) => !prev)}
                  className={`block py-2 px-3  bg-blue-700 rounded md:bg-transparent ${
                    location.pathname === "/cart"
                      ? "md:text-blue-700"
                      : "text-black"
                  } md:p-0 relative
                  ${
                    location.pathname === "/cart"
                      ? "bg-white"
                      : "bg-transparent"
                  } md:dark:text-blue-500`}
                >
                  Cart
                  <span className="absolute left-8 items-center justify-center p-1 w-4 h-4 ms-2 text-xs font-semibold text-blue-200 bg-blue-800 rounded-full hidden md:inline-flex">
                    {items.length}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
