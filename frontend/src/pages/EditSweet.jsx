import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EditSweet = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const { token, sweets, fetchSweets } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(true);

  // Load existing data
  useEffect(() => {
    const sweetToEdit = sweets.find((s) => s._id === id);
    if (sweetToEdit) {
      setFormData(sweetToEdit);
      setLoading(false);
    } else {
        // Fallback if page reloaded and context empty, fetch from API
       axios.get(`http://localhost:5000/api/sweets`)
        .then(res => {
            const found = res.data.find(s => s._id === id);
            if(found) setFormData(found);
            setLoading(false);
        })
        .catch(() => navigate("/admin/manage-sweets"));
    }
  }, [id, sweets, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      // PUT Request to Update Details
      await axios.put(`http://localhost:5000/api/sweets/${id}`, formData, config);
      
      alert("Sweet Updated Successfully! ✅");
      await fetchSweets(); // Refresh Context
      navigate("/admin/manage-sweets");
      
    } catch (err) {
      alert("Update Failed.");
      console.error(err);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">✏️ Edit Sweet Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded" required>
              <option value="Barfi">Barfi</option>
              <option value="Syrup">Syrup Based</option>
              <option value="Laddu">Laddu</option>
              <option value="Dry Fruit">Dry Fruit</option>
              <option value="Ghee">Desi Ghee</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-bold text-gray-700">Price (₹)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-bold text-gray-700">Stock (kg)</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Image URL</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
            Update Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSweet;