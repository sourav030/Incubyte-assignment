import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || ""); 


  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSweets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sweets");
      setSweets(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching sweets:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  
  const [cart, setCart] = useState([]);

  
  const loginUser = (token, role) => {
    setToken(token);
    setRole(role);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  };

  const logoutUser = () => {
    setToken("");
    setRole("");
    setCart([]);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };


  const addToCart = (sweet, qty) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === sweet._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === sweet._id
            ? { ...item, cartQty: item.cartQty + qty }
            : item
        );
      } else {
        return [...prevCart, { ...sweet, cartQty: qty }];
      }
    });
  };

  
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const cartItemCount = cart.reduce((total, item) => total + 1, 0);

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        role, 
        loginUser, 
        logoutUser, 
        sweets,       
        loading,      
        fetchSweets,  
        cart,         
        setCart,      
        addToCart,
        removeFromCart, 
        cartItemCount 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};