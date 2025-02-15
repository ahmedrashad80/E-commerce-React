import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { TokenContext } from "../context/TokenContext";

function NavBar() {
  const { cart } = useContext(CartContext);
  const { token, setToken } = useContext(TokenContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark px-5 py-2">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            AHMED
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  contact
                </NavLink>
              </li>
              {token ? (
                <>
                  <li
                    className="nav-item"
                    onClick={() => {
                      setToken(localStorage.removeItem("token"));
                    }}
                  >
                    <NavLink className="nav-link" to="/login">
                      logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      login
                    </NavLink>
                  </li>
                  {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      register
                    </NavLink>
                  </li> */}
                </>
              )}

              <li className="nav-item ">
                <NavLink className="nav-link position-relative" to="/cart">
                  <i
                    className="fa-solid fa-cart-shopping fa-lg"
                    style={{ color: "#27d0c7" }}
                  />
                  <span
                    className="position-absolute  translate-middle badge rounded-pill bg-danger"
                    style={{ left: "90%", top: "30%" }}
                  >
                    {cart.length}
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
