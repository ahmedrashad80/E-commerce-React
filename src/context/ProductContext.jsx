import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();
function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(5);
  async function getProduct() {
    try {
      let { data } = await axios.get(`https://fakestoreapi.com/products`);
      console.log(data);
      setProducts(data);

      setTotalPages(Math.ceil(data.length / limit));
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    getProduct();
  }, []);
  const value = {
    products,
    setProducts,
    getProduct,
    totalPages,
    setTotalPages,
    limit,
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
export default ProductProvider;
