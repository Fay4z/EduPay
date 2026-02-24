import { Navigate } from "react-router-dom";

const StudentProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("studentToken");
  const role = localStorage.getItem("role");

  if (!token || role !== "student") {
    return <Navigate to="/student/login" />;
  }

  return children;
};

export default StudentProtectedRoute;
