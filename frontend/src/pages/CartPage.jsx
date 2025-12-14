import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CartPage = () => {
  
  const { cart, removeFromCart, token, fetchSweets, setCart } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const grandTotal = cart.reduce((total, item) => total + (item.price * item.cartQty), 0);

  
  const handleCheckout = async () => {
    if (!token) {
      alert("Please login to checkout!");
      navigate("/login");
      return;
    }

    if (!window.confirm(`Confirm purchase for ₹${grandTotal}?`)) return;

    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      
      for (const item of cart) {
        await axios.post(
          `http://localhost:5000/api/sweets/${item._id}/purchase`, 
          { quantity: item.cartQty },
          config
        );
      }

      alert("Order Placed Successfully! 🎉");
      
    
      if (setCart) {
        setCart([]); 
      }

      
      await fetchSweets(); 
      
     
      navigate("/"); 

    } catch (err) {
      console.error(err);
      alert("Purchase Failed! Some items might be out of stock.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          🛒 Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-md text-center">
            <h2 className="text-2xl font-bold text-gray-400 mb-4">Your cart is empty!</h2>
            <Link to="/" className="bg-pink-500 text-white px-6 py-2 rounded-full font-bold hover:bg-pink-600 transition">
              Go Shopping 🍬
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row items-center justify-between">
                  <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <button 
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 text-xs font-bold mt-1 hover:text-red-700 underline transition"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                  <div className="text-right mt-4 sm:mt-0 w-full sm:w-auto">
                    <p className="text-sm text-gray-500">{item.cartQty} kg x ₹{item.price}</p>
                    <p className="font-bold text-lg text-rose-600">₹ {item.cartQty * item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-xl shadow h-fit sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Total Items:</span>
                <span className="font-semibold">{cart.length}</span>
              </div>
              <div className="flex justify-between mt-4 text-xl font-bold text-gray-900 border-t pt-4">
                <span>Grand Total:</span>
                <span>₹ {grandTotal}</span>
              </div>

              <button 
                className={`w-full mt-6 text-white py-3 rounded-lg font-bold shadow-lg transform transition
                  ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 active:scale-95"}`}
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Processing..." : "Checkout Now"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;