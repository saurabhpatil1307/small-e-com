import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import { useProductCon } from "./context/ProductContext";
import Navbar from "./component/Navbar";
import { Outlet } from "react-router-dom";

function App() {

  const {name} = useProductCon();
  return (
    <>
    <Navbar/>
    <ToastContainer />
      <div>
        <Outlet/>
      </div>
    </>
  );
}

export default App;
