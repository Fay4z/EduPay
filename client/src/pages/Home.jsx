import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">EduPay</h1>

        <p className="text-lg text-gray-600 mb-8">
          A simple and secure platform for schools to manage student fee
          payments. EduPay helps administrators organize payments and allows
          students to easily track their fee status online.
        </p>

        <div className="flex justify-center gap-4">
          <NavLink to="/login">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Login as School Admin
            </button>
          </NavLink>

          <NavLink to="/student/login">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Login as School Student
            </button>
          </NavLink>

          <NavLink to="/register">
            <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition">
              Register School
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Home;
