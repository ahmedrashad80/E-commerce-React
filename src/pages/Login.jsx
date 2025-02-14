import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../context/TokenContext";
function Login() {
  const [apiError, setApiError] = useState(null);
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        "Invalid password"
      )
      .required("Password is required"),
  });
  async function login(values) {
    try {
      const { data } = await axios.post(
        "http://localhost:3033/auth/login",
        values
      );
      console.log(data);
      setApiError(null);
      localStorage.setItem("token", data.token);
      setToken(data.token);

      if (data.massage === "success login") {
        // navigation to login
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      console.log(error.response.data);
      setApiError(error.response.data.massage);
    }
  }
  let loginForm = useFormik({
    initialValues,
    // validate,
    validationSchema,

    onSubmit: login,
  });
  return (
    <>
      <div className="container my-5 d-flex justify-content-center">
        <div
          className="card shadow my-5"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Log In</h3>

            <form onSubmit={loginForm.handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputEmail"
                  placeholder="name@example.com"
                  name="email"
                  value={loginForm.values.email}
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                />
                <label htmlFor="floatingInputEmail">Email address</label>
                {loginForm.touched.email && loginForm.errors.email && (
                  <div className="form-text text-danger mb-2 ms-2">
                    *{loginForm.errors.email}
                  </div>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  value={loginForm.values.password}
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                />
                <label htmlFor="floatingPassword">Password</label>
                {loginForm.touched.password && loginForm.errors.password && (
                  <div className="form-text text-danger mb-2 ms-2">
                    *{loginForm.errors.password}
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-outline-dark w-100">
                login
              </button>
              {apiError && (
                <h3 className=" text-danger m-2 text-center">*{apiError}</h3>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
