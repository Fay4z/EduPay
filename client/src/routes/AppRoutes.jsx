import Home from "@/pages/Home";
import Login from "@/features/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import RegisterSchool from "@/features/auth/RegisterSchool";
import AdminDashboard from "@/features/admin/AdminDashboard";
import AdminLayout from "@/components/layout/AdminLayout";
import Students from "@/features/admin/Students";
import Fees from "@/features/admin/Fees";
import Payments from "@/features/admin/Payments";
import Settings from "@/features/admin/Settings";
import StudentLogin from "@/features/auth/StudentLogin";
import StudentDashboard from "@/features/student/StudentDashboard";
import StudentLayout from "@/components/layout/StudentLayout";
import Profile from "@/features/student/Profile";
import StudentPayment from "@/features/student/StudentPayment";

function AppRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="student/login" element={<StudentLogin />} />
            {/* <Route path="signup" element={<Signup />} /> */}
            <Route path="register" element={<RegisterSchool />} />
          </Route>

          <Route path="/admindashboard" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="fees" element={<Fees />} />
            <Route path="payments" element={<Payments />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/studentdashboard" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="payments" element={<StudentPayment />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
