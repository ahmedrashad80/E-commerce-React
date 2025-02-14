import { Navigate } from "react-router-dom";

function ProtectRoutes({ children }) {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default ProtectRoutes;
