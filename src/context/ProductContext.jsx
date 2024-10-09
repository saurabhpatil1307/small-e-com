import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const ProdContext = createContext()

function ProductContext(props) {

  // const [items, setItems] = useState([]);
  const [serchText, setSearchT] = useState("")
  const [showSide, setShowSide] = useState(true)

  const notify = (type, msg) => {
    switch (type) {
      case "success":
        toast.success(msg,{position: "top-center",})
        break;
      case "fail":
        toast.error(msg,{position: "top-center",})
        break;
      default:
        toast(msg)
        break;
    } 
  };

  const handleCart = (item, quantity) => {
    let newItems = [...items];
    let findProd = newItems.find((prod) => prod.id === item.id);
    if (findProd) {
      newItems = newItems.map((prod) => {
        if (prod.id === findProd.id) {
          console.log("found same id");
          return { ...findProd, quantity: quantity };
        } else {
          return prod;
        }
      });
      console.log(newItems);
      setItems(newItems);
    } else {
      setItems([...newItems, { ...item, quantity }]);
    }
    notify("success", "Item added successfully")
  };
  const removeItem = (id) => {
    const newItems = items.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });
    setItems(newItems);
    notify("fail", "Item removed successfully")
  };
  
  const [items, setItems] = useState(()=> {
    const storedItems = localStorage.getItem("items");
    return storedItems ? JSON.parse(storedItems) : []
  });

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));

    let val = localStorage.getItem('items');
    console.log(JSON.parse(val))
    
  }, [items]);

  return (
    <ProdContext.Provider value={{items, setItems, serchText, setSearchT, showSide, setShowSide, handleCart, notify, removeItem}}>
        {props.children}
    </ProdContext.Provider>
  )
}
export function useProductCon() {
    return useContext(ProdContext)
}

export default ProductContext