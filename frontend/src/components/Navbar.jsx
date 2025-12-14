import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, role, logoutUser, cartItemCount } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">


          <Link to="/" className="text-3xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-200">
            🍬 Sweet Shop
          </Link>


          <div className="flex items-center space-x-6">


            <Link to="/cart" className="relative group">
              <span className="text-2xl">🛒</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-yellow-400 text-rose-800 text-xs font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
                  {cartItemCount}
                </span>
              )}
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs py-1 px-2 rounded transition-opacity duration-200">
                Cart
              </span>
            </Link>


            {role === "admin" && (
              <div className="hidden md:flex items-center space-x-5 bg-white/10 px-4 py-1.5 rounded-full mr-2">
                <span className="text-xs font-bold text-pink-200 uppercase tracking-wider">Admin:</span>
                <Link to="/admin/add-sweet" className="text-sm font-semibold hover:text-yellow-300 transition">+ Add</Link>
                <Link to="/admin/manage-sweets" className="text-sm font-semibold hover:text-yellow-300 transition">Manage</Link>
              </div>
            )}


            {!token ? (
              <div className="flex space-x-4">
                <Link to="/login" className="px-4 py-2 border border-white rounded-full font-medium hover:bg-white hover:text-rose-600 transition">Login</Link>

              </div>
            ) : (
              <button onClick={handleLogout} className="px-5 py-2 bg-red-500 bg-opacity-90 hover:bg-red-600 rounded-full font-semibold shadow hover:shadow-lg transition">Logout</button>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}