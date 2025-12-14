import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddSweet = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      await axios.post("http://localhost:5000/api/sweets", formData, config);
      
      alert("Sweet Added Successfully! 🍬");
      navigate("/"); 
    } catch (err) {
      console.error(err);
      alert("Error adding sweet");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Sweet Item</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input type="text" name="name" placeholder="Sweet Name" required
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            onChange={handleChange} />

          <select name="category" required onChange={handleChange}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white">
            <option value="">Select Category</option>
            <option value="Barfi">Barfi</option>
            <option value="Syrup">Syrup Based</option>
            <option value="Laddu">Laddu</option>
            <option value="Dry Fruit">Dry Fruit</option>
            <option value="Ghee">Desi Ghee</option>
          </select>

          <div className="flex space-x-4">
            <input type="number" name="price" placeholder="Price (₹/kg)" required
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              onChange={handleChange} />
            
            <input type="number" name="quantity" placeholder="Quantity (kg)" required
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              onChange={handleChange} />
          </div>

          <input type="text" name="imageUrl" placeholder="Image URL" required
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            onChange={handleChange} />

          <button type="submit" 
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 transition">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSweet;