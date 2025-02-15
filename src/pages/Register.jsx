import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  // function validate(values) {
  //   const errors = {};
  //   if (!values.userName) {
  //     errors.userName = "User Name is required";
  //   } else if (values.userName.length < 3) {
  //     errors.userName = "User Name must be at least 3 characters";
  //   } else if (values.userName.length > 10) {
  //     errors.userName = "User Name must be less than 10 characters";
  //   }
  //   if (!values.email) {
  //     errors.email = "Email is required";
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  //   ) {
  //     errors.email = "Invalid email address";
  //   }
  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   } else if (
  //     !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
  //       values.password
  //     )
  //   ) {
  //     errors.password = "invalid password";
  //   }
  //   if (!values.confirmPassword) {
  //     errors.confirmPassword = "Confirm Password is required";
  //   } else if (values.password !== values.confirmPassword) {
  //     errors.confirmPassword = "Passwords do not match";
  //   }
  //   return errors;
  // }
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(3, "User Name must be at least 3 characters")
      .max(10, "User Name must be less than 10 characters")
      .required("User Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        "Invalid password"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "not matching with password")
      .required(" required"),
  });
  async function register(values) {
    try {
      const { data } = await axios.post(
        "http://localhost:3033/auth/signup",
        values
      );
      console.log(data);
      setApiError(null);
      if (data.massage === "created") {
        // navigation to login
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      console.log(error.response.data);
      setApiError(error.response.data.massage);
    }
  }
  let registerForm = useFormik({
    initialValues,
    // validate,
    validationSchema,

    onSubmit: register,
  });
  return (
    <>
      <div className="container my-5 d-flex justify-content-center">
        <div
          className="card shadow my-5"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Sign Up</h3>

            <form onSubmit={registerForm.handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="User Name"
                  name="userName"
                  value={registerForm.values.userName}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                />
                <label htmlFor="userName">User Name</label>
                {registerForm.touched.userName &&
                  registerForm.errors.userName && (
                    <div className="form-text text-danger ms-2">
                      *{registerForm.errors.userName}
                    </div>
                  )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputEmail"
                  placeholder="name@example.com"
                  name="email"
                  value={registerForm.values.email}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                />
                <label htmlFor="floatingInputEmail">Email address</label>
                {registerForm.touched.email && registerForm.errors.email && (
                  <div className="form-text text-danger mb-2 ms-2">
                    *{registerForm.errors.email}
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
                  value={registerForm.values.password}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                />
                <label htmlFor="floatingPassword">Password</label>
                {registerForm.touched.password &&
                  registerForm.errors.password && (
                    <div className="form-text text-danger mb-2 ms-2">
                      *{registerForm.errors.password}
                    </div>
                  )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPasswordConfirm"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={registerForm.values.confirmPassword}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                />
                <label htmlFor="floatingPasswordConfirm">
                  Confirm Password
                </label>
                {registerForm.touched.confirmPassword &&
                  registerForm.errors.confirmPassword && (
                    <div className="form-text text-danger mb-2 ms-2 ">
                      *{registerForm.errors.confirmPassword}
                    </div>
                  )}
              </div>
              <button type="submit" className="btn btn-outline-dark w-100">
                Register
              </button>
              {apiError && (
                <h3 className=" text-danger m-2 text-center">*{apiError}</h3>
              )}
            </form>
            <p className="text-center mt-3">
              i already have account<Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
