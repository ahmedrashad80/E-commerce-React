import axios from "axios";
import { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../context/TokenContext";

function Categories() {
  const [catogories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const { token } = useContext(TokenContext);
  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategories(data);
      if (data.length > 0) {
        const defaultCategory = data[0];
        setActiveCategory(defaultCategory);
        getProducts(defaultCategory);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async function getProducts(category) {
    try {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );

      setProducts(data);
      console.log(products);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);
  const navigate = useNavigate();
  const getDetails = (id) => {
    navigate(`/product/${id}`);
  };
  const addToCart = (id) => {
    if (!token) {
      alert("Please login to add products to cart");
      return;
    }
    const product = products.find((product) => product.id === id);

    const isExist = cart.findIndex((product) => product.id === id);
    if (isExist !== -1) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center my-3">
          {catogories.map((category, index) => (
            <button
              key={index}
              type="button"
              className={`btn m-1 ${
                activeCategory === category
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => {
                setActiveCategory(category);
                getProducts(category);
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="row">
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              productDetails={getDetails}
              addCart={addToCart}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
