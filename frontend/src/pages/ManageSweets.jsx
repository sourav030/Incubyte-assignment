import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ManageSweets = () => {
  const { sweets, token, fetchSweets } = useContext(AuthContext);

 
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/sweets/${id}`, config);
      alert("Deleted successfully ✅");
      fetchSweets();
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  // --- RESTOCK FUNCTION (NEW) ---
  const handleRestock = async (id, currentQty) => {
    const amountStr = prompt(`Current Stock: ${currentQty}kg\nHow much to add?`, "10");
    if (!amountStr) return; // Cancelled

    const amount = parseInt(amountStr);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid number!");
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // Backend API call: POST /restock
      await axios.post(
        `http://localhost:5000/api/sweets/${id}/restock`, 
        { quantity: amount }, 
        config
      );
      
      alert(`Stock updated! Added ${amount}kg.`);
      fetchSweets(); // Refresh UI

    } catch (err) {
      console.error(err);
      alert("Restock failed. Error: " + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          ⚙️ Manage Inventory <span className="text-sm ml-4 font-normal text-gray-500">Total Items: {sweets.length}</span>
        </h1>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-rose-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-rose-800 uppercase">Stock</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-rose-800 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sweets.map((sweet) => (
                <tr key={sweet._id} className="hover:bg-gray-50 transition">
                  {/* Name */}
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <img src={sweet.imageUrl} alt="" className="h-10 w-10 rounded-full object-cover border mr-3" />
                    <span className="font-medium text-gray-900">{sweet.name}</span>
                  </td>
                  
                  {/* Price */}
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-700">₹{sweet.price}</td>
                  
                  {/* Stock with Color Code */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${sweet.quantity < 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {sweet.quantity} kg
                    </span>
                  </td>
                  
                  {/* ACTIONS: Restock & Delete */}
                  <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                    
                    {/* RESTOCK BUTTON */}
                    <button 
                      onClick={() => handleRestock(sweet._id, sweet.quantity)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm font-semibold shadow"
                    >
                      + Restock
                    </button>

                    {/* DELETE BUTTON */}
                    <button 
                      onClick={() => handleDelete(sweet._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm font-semibold shadow"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageSweets;