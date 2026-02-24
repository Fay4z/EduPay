import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const SidebarLink = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block rounded-lg px-4 py-2 text-sm font-medium transition ${
        isActive
          ? "bg-primary text-white"
          : "text-muted-foreground hover:bg-muted"
      }`
    }
  >
    {label}
  </NavLink>
);

const StudentLayout = () => {
  const { userEmail, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/student/login");
  };

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="w-64 bg-white border-r hidden md:flex flex-col justify-between p-5">
        <div>
          <h2 className="text-xl font-bold mb-8">EduPay Student</h2>

          <nav className="space-y-2">
            <SidebarLink to="/studentdashboard" label="Dashboard" />
            <SidebarLink to="/studentdashboard/payments" label="My Payments" />
            <SidebarLink to="/studentdashboard/profile" label="Profile" />
          </nav>
        </div>

        <div className="border-t pt-4 space-y-3">
          <p className="text-sm font-medium truncate">{userEmail}</p>
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <h1 className="font-semibold text-lg">Student Dashboard</h1>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
