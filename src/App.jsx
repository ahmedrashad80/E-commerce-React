import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import CartProvider from "./context/CartContext";
import Cart from "./pages/Cart";
import TokenProvider from "./context/TokenContext";
import ProtectRoutes from "./components/ProtectRoutes";
import ProductDetails from "./pages/ProductDetails";
import ProductContext from "./context/ProductContext";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/categories", element: <Categories /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/contact", element: <Contact /> },
        { path: "/product/:id", element: <ProductDetails /> },
        {
          path: "/cart",
          element: (
            <ProtectRoutes>
              <Cart />
            </ProtectRoutes>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <ProductContext>
        <TokenProvider>
          <CartProvider>
            <RouterProvider router={routes}></RouterProvider>
          </CartProvider>
        </TokenProvider>
      </ProductContext>
    </>
  );
}

export default App;
