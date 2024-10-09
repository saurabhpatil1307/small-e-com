import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "../component/Card";
import { ArroDown, ArroUp } from "../assets/svgs/svg";
import { useProductCon } from "../context/ProductContext";

function AllProducts() {
  const fetchPage = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res;
  };

  const fetchCate = async () => {
    const res = await axios.get("https://fakestoreapi.com/products/categories");
    return res;
  };

  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});
  const [pFiter, setPFilter] = useState("");
  const [aFiter, setAFilter] = useState("");
  const [selRad, setSelRad] = useState("")
  const { serchText, showSide } = useProductCon();

  useEffect(()=>{
    if(serchText.length > 0){
      const newItems = allProducts.filter((prod)=> {
        return (prod.title.toLowerCase().includes(serchText.toLowerCase()) || prod.description.toLowerCase().includes(serchText.toLowerCase()));
      })
      setAllProducts(newItems);
    }
    if(serchText.length === 0){
      setAllProducts(data?.data);
    }
  },[serchText])

  const { isError, isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchPage(),
    staleTime: Infinity,
  });

  const cate = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCate(),
    staleTime: Infinity,
  });

  useEffect(() => {
    setAllProducts(data?.data);
    setAllCategories(cate?.data?.data);
  }, [data, cate.data]);

  
  const handlePFilt = () => {
    if (pFiter === "") {
      setPFilter("ASC");
      setAFilter("");
      allProducts.sort((a, b) => a.price - b.price);
    } else if (pFiter === "ASC") {
      setPFilter("DESC");
      setAFilter("");
      allProducts.sort((a, b) => b.price - a.price);
    } else {
      setPFilter("");
      setAFilter("");
    }
  };

  const handleAFilt = () => {
    if (aFiter === "") {
      setAFilter("ASC");
      setPFilter("");
      allProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (aFiter === "ASC") {
      setAFilter("DESC");
      setPFilter("");
      allProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      setPFilter("");
      setAFilter("");
    }
  };

  const hanldeCheckB = (e, index) => {
    const { name, checked } = e.target;
    setSelRad(0)
    setCheckboxes({ ...checkboxes, [name]: checked });
  };

  const handleRadioChange = (min, max) => {
    setSelRad(max)
    const selectedCategories = Object.keys(checkboxes).filter(
      (category) => checkboxes[category]
    );
    const checkIsOk = (prod) => {
      return selectedCategories.includes(prod.category)
    }
    if(selectedCategories.length > 0){
      setAllProducts(
        data?.data?.filter((prod) => {
          if (
            prod.price >= min &&
            prod.price <= max &&
            checkIsOk(prod)
          ) {
            return prod;
          }
        })
      );
    }else{
      setAllProducts(
        data?.data?.filter((prod) => {
          if (
            prod.price >= min &&
            prod.price <= max 
          ) {
            return prod;
          }
        })
      );
    }
  };

  useEffect(() => {
    const selectedCategories = Object.keys(checkboxes).filter(
      (category) => checkboxes[category]
    );
    const filteredProd = data?.data?.filter((item) =>
      selectedCategories.includes(item.category)
    );
    if (selectedCategories.length === 0) {
      setAllProducts(data?.data);
      return;
    }
    setAllProducts(filteredProd);
  }, [checkboxes]);

  const clearFilter = () => {
    setSelRad(0);
    setCheckboxes({});
    setPFilter("");
    setAFilter("");
    setAllProducts(data?.data);
  }

  if (isLoading || cate?.isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || cate?.isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="w-full flex justify-center ">
        <div className={`w-[200px] ${showSide ? "flex" : "hidden"} flex-wrap  bg-white border border-gray-200 rounded-tr-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
          <div className="p-5 flex flex-col">
            <h2>Sort by: </h2>
            <div className="mt-2">
              <button
                className="border border-gray-200 rounded-lg shadow px-3 inline-flex"
                onClick={handlePFilt}
              >
                <span className="mr-2">Price</span>{" "}
                {pFiter === "" ? (
                  ""
                ) : pFiter === "ASC" ? (
                  <ArroUp />
                ) : (
                  <ArroDown />
                )}
              </button>
              <button
                className="border border-gray-200 rounded-lg shadow px-3 flex mt-2"
                onClick={handleAFilt}
              >
                <span className="mr-2">Alphabate</span>{" "}
                {aFiter === "" ? (
                  ""
                ) : aFiter === "ASC" ? (
                  <ArroUp />
                ) : (
                  <ArroDown />
                )}
              </button>
            </div>
            <div className="mt-3">
              <h1>Category: </h1>
              <div className="my-3">
                {allCategories?.map((cate, index) => {
                  return (
                    <div key={index}>
                      <input
                        type="checkbox"
                        name={cate}
                        id={cate}
                        value={cate}
                        checked={checkboxes[cate]} 
                        className="mr-2"
                        onClick={(e) => hanldeCheckB(e, index)}
                      />
                      <label htmlFor={cate}>{cate}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h2>Price range: </h2>
              <div className="mt-2">
                <input
                  type="radio"
                  name="price"
                  id="price0"
                  className="mr-2"
                  value="under 50"
                  checked={selRad === 50}
                  onChange={(e) => handleRadioChange(0, 50)}
                />
                <label htmlFor="price0">under 50$</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="price"
                  id="price1"
                  className="mr-2"
                  value="50 to 100"
                  checked={selRad === 100}
                  onChange={(e) => handleRadioChange(50, 100)}
                />
                <label htmlFor="price1">50$ to 100$</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="price"
                  id="price2"
                  className="mr-2"
                  value="above 100"
                  checked={selRad === 100000000}
                  onChange={(e) => handleRadioChange(100, 100000000)}
                />
                <label htmlFor="price2">above 100$</label>
              </div>
            </div>
            <button onClick={clearFilter} className="border-1 border-gray-200 shadow-sm p-2 bg-gray-200 mt-3">
              Clear filter
            </button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 w-[90%] gap-5 p-5 ">
          {allProducts?.map((item) => {
            return <Card key={item.id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
}

export default AllProducts;
