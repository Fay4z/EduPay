import Home from "@/pages/Home";
import Login from "@/features/auth/Login";
import Signup from "@/features/auth/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import RegisterSchool from "@/features/auth/RegisterSchool";
import AdminDashboard from "@/features/admin/AdminDashboard";
import AdminLayout from "@/components/layout/AdminLayout";
import Students from "@/features/admin/Students";
import Fees from "@/features/admin/Fees";
import Payments from "@/features/admin/Payments";
import Settings from "@/features/admin/Settings";

function AppRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register" element={<RegisterSchool />} />
          </Route>

          <Route path="/admindashboard" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="fees" element={<Fees />} />
            <Route path="payments" element={<Payments />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
