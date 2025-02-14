import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

function Categories() {
  const [catogories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
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
              // changePrice={updatePrice}
              // deleteProduct={removeProduct}
              key={product.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
