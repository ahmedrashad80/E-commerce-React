import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { TokenContext } from "./../context/TokenContext";

function ProductDetails() {
  const { cart, setCart } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  const { id } = useParams();
  const [product, setProduct] = useState();
  async function getProduct(id) {
    try {
      let { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);

      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProduct(id);
  }, []);
  const addToCart = (id) => {
    if (!token) {
      alert("Please login to add products to cart");
      return;
    }

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
      {product ? (
        <>
          <div className="container my-5">
            <div className="row g-4">
              <div className="col-md-6">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid rounded shadow"
                  style={{
                    height: "70vh",
                    objectFit: "contain",
                    backgroundColor: "#333",
                  }}
                />
              </div>

              <div className="col-md-6">
                <h1 className="mb-3">{product.title}</h1>
                <p className="text-muted mb-1">{product.category}</p>
                <h2 className="text-primary mb-3">${product.price}</h2>

                {/* Rating */}
                <div className="d-flex align-items-center mb-3">
                  <span className="badge bg-success fs-6 me-2">
                    {product.rating.rate} / 5
                  </span>
                  <small>({product.rating.count} reviews)</small>
                </div>

                <p className="mb-4">{product.description}</p>

                <button
                  className="btn btn-outline-dark btn-lg"
                  onClick={() => addToCart(product.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>loading</h1>
      )}
    </>
  );
}

export default ProductDetails;
