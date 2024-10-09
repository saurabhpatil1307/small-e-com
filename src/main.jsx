import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductContext from "./context/ProductContext.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import ProductInfo from "./pages/ProductInfo.jsx";
import Cart from "./pages/Cart.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AllProducts />,
      },
      {
        path: "/:id",
        element: <ProductInfo />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
const queryClient = new QueryClient

createRoot(document.getElementById("root")).render(
  <ProductContext>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ProductContext>
);
