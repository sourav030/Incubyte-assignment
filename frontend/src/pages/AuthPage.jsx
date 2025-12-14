import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5000/api";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const res = await axios.post(`${BASE_URL}/auth/login`, {
          email: form.email,
          password: form.password,
        });

        // Login Success
        const { token, role } = res.data;
        loginUser(token, role);
        alert("Login Successful! 🍬");
        navigate("/"); 
      } 
      else {
        // --- REGISTER LOGIC ---
        await axios.post(`${BASE_URL}/auth/register`, form);

        // Register Success
        alert("Account Created Successfully! Please Login now. 🎉");
        setIsLogin(true); 
        setForm({ ...form, password: "" }); 
      }

    } catch (err) {
      console.error("Auth Error:", err);
      const errorMessage = err.response?.data?.msg || err.response?.data?.message || "Something went wrong.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 to-rose-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-pink-100 transform transition-all duration-300">
        
        <div className="text-center mb-8">
          <span className="text-4xl block mb-2">🍬</span>
          <h2 className="text-3xl font-extrabold text-gray-800">
            {isLogin ? "Welcome Back!" : "Join Sweet Shop"}
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            {isLogin ? "Please login to satisfy your cravings" : "Create an account to order fresh sweets"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Field (Signup Only) */}
          {!isLogin && (
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Ex. Rahul Verma"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role Selection (Signup Only) */}
          {!isLogin && (
             <div>
             <label className="block text-gray-700 text-sm font-semibold mb-1">Select Role</label>
             <select
               name="role"
               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
               value={form.role}
               onChange={handleChange}
             >
               <option value="user">User (Customer)</option>
               <option value="admin">Admin (Shop Owner)</option>
             </select>
           </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-6 text-white font-bold rounded-lg shadow-md transform transition-all duration-200 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-pink-500 to-rose-600 hover:shadow-xl hover:scale-[1.02]"}`}
          >
            {loading ? "Processing..." : (isLogin ? "Login Now" : "Create Account")}
          </button>
        </form>

        <div className="mt-6 text-center pt-4 border-t border-gray-100">
          <p className="text-gray-600 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setForm({ name: "", email: "", password: "", role: "user" });
              }}
              className="text-rose-600 font-bold hover:underline focus:outline-none ml-1"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}