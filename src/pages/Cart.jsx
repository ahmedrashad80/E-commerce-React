import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  // Remove product from cart
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <>
      <h1
        className="mb-4 text-center  p-3 fw-bold"
        style={{ backgroundColor: "#655f5f", color: "#a46644" }}
      >
        Your Cart
      </h1>
      <div className="container m-5">
        {cart.length === 0 ? (
          <div className="alert alert-info">Your cart is empty.</div>
        ) : (
          <>
            <div className="row">
              {cart.map((item) => (
                <div key={item.id} className="col-12 mb-3">
                  <div className="card shadow">
                    <div className="row g-0">
                      {/* Product Image */}
                      <div className="col-md-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid rounded-start"
                          style={{ objectFit: "contain", height: "150px" }}
                        />
                      </div>
                      {/* Product Details */}
                      <div className="col-md-4">
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text">
                            <small className="text-muted">
                              {item.category}
                            </small>
                          </p>
                          <p className="card-text">
                            Price: ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      {/* Quantity Controls and Remove */}
                      <div className="col-md-3 d-flex flex-column align-items-center justify-content-center">
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            -
                          </button>
                          <span className="mx-2 ">{item.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2 d-flex align-items-center justify-content-center ">
                        <button
                          className="btn btn-sm btn-outline-danger rounded-pill mt-2"
                          onClick={() => removeItem(item.id)}
                        >
                          <i
                            className="fa-solid fa-xmark fa-2xl"
                            style={{ color: "#ab170d" }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Total and Checkout */}
            <div className="text-end">
              <h3>Total: ${totalPrice.toFixed(2)}</h3>
              <button className="btn btn-outline-dark">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
