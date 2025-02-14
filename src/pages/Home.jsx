import { useContext, useEffect, useState } from "react";
import PaginationComponent from "../components/Pagination";
import { CartContext } from "../context/CartContext";
import { TokenContext } from "../context/TokenContext";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

function Home() {
  const [searchValue, setSearchValue] = useState("");
  const { products, setProducts, getProduct } = useContext(ProductContext);
  const { cart, setCart } = useContext(CartContext);
  const { token } = useContext(TokenContext);

  const [displayedProducts, setDisplayedProducts] = useState([]);
  useEffect(() => {
    if (!searchValue) {
      setDisplayedProducts(products);
    }
  }, [products, searchValue]);

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

  const searchProduct = (value) => {
    if (!value) {
      setDisplayedProducts(products);
    } else {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setDisplayedProducts(filteredProducts);
    }
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    searchProduct(value);
  };

  return (
    <>
      <div className="container-fluid  d-flex justify-content-center bg-dark p-2">
        <div className="input-group w-50">
          <span className="input-group-text bg-primary text-white">
            <i className="fa fa-search"></i>
          </span>
          <input
            type="text"
            onChange={handleSearchChange}
            className="form-control"
            placeholder="Search products..."
            value={searchValue}
          />
        </div>
      </div>

      <PaginationComponent
        productDetails={getDetails}
        addCart={addToCart}
        search={displayedProducts}
        searchValue={searchValue}
      />
    </>
  );
}

export default Home;
