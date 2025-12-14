import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Context Import

const HomePage = () => {
 
  const { sweets, addToCart, loading } = useContext(AuthContext);

  const [filteredSweets, setFilteredSweets] = useState([]);
  
  
  const [cartQuantities, setCartQuantities] = useState({});

  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    minPrice: "",
    maxPrice: "",
  });

 
  useEffect(() => {
    setFilteredSweets(sweets);
  }, [sweets]);

  
  const categories = ["All", ...new Set(sweets.map((s) => s.category))];

 
  const getSelectedQty = (id) => cartQuantities[id] || 1;

  const handleIncrement = (id, maxStock) => {
    const currentQty = getSelectedQty(id);
    if (currentQty < maxStock) {
      setCartQuantities({ ...cartQuantities, [id]: currentQty + 1 });
    }
  };

  const handleDecrement = (id) => {
    const currentQty = getSelectedQty(id);
    if (currentQty > 1) {
      setCartQuantities({ ...cartQuantities, [id]: currentQty - 1 });
    }
  };


  const handleAddToCartClick = (sweet) => {
    const qty = getSelectedQty(sweet._id);
    addToCart(sweet, qty); 
    alert(`Added ${qty} kg of ${sweet.name} to cart! 🛒`);
    
   
    setCartQuantities({ ...cartQuantities, [sweet._id]: 1 });
  };

 
  useEffect(() => {
    let result = sweets;

    
    if (filters.search) {
      result = result.filter((s) => s.name.toLowerCase().includes(filters.search.toLowerCase()));
    }
   
    if (filters.category !== "All") {
      result = result.filter((s) => s.category === filters.category);
    }
    
    if (filters.minPrice) {
      result = result.filter((s) => s.price >= Number(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      result = result.filter((s) => s.price <= Number(filters.maxPrice));
    }

    setFilteredSweets(result);
  }, [filters, sweets]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

 
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-3xl font-bold text-rose-500 animate-pulse flex flex-col items-center">
          <span className="text-5xl mb-4">🍬</span>
          Loading Fresh Sweets...
        </div>
      </div>
    );
  }

 
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      
     
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          🔍 Find Your Sweet Craving
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
         
          <input 
            type="text" name="search" placeholder="Search sweets..." 
            className="border p-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" 
            onChange={handleFilterChange} 
          />
          
        
          <select 
            name="category" 
            className="border p-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" 
            onChange={handleFilterChange}
          >
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          
         
          <input 
            type="number" name="minPrice" placeholder="Min Price (₹)" 
            className="border p-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" 
            onChange={handleFilterChange} 
          />
          <input 
            type="number" name="maxPrice" placeholder="Max Price (₹)" 
            className="border p-3 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" 
            onChange={handleFilterChange} 
          />
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto">
        {filteredSweets.length === 0 ? (
          <div className="text-center text-gray-500 text-xl mt-10">
            No sweets found matching your criteria. 🍬
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredSweets.map((sweet) => {
              const selectedQty = getSelectedQty(sweet._id);
              const isOutOfStock = sweet.quantity === 0;

              return (
                <div key={sweet._id} className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-transform duration-300 ${!isOutOfStock && "hover:scale-105"}`}>
                  
                 
                  <div className="h-48 w-full overflow-hidden relative">
                    <img 
                      src={sweet.imageUrl} 
                      alt={sweet.name} 
                      className={`w-full h-full object-cover ${isOutOfStock ? "grayscale opacity-50" : ""}`} 
                    />
                    <span className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {sweet.category}
                    </span>
                    {isOutOfStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                        <span className="text-white font-bold text-lg border-2 border-white px-4 py-1 rounded">OUT OF STOCK</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-gray-800">{sweet.name}</h3>
                      <span className="text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded text-sm">₹{sweet.price}/kg</span>
                    </div>
                    
                    <p className={`text-sm mt-1 font-medium ${sweet.quantity < 5 ? "text-red-500" : "text-gray-500"}`}>
                      Stock: {sweet.quantity} kg available
                    </p>

                    {/* Quantity Controls */}
                    {!isOutOfStock && (
                      <div className="flex items-center justify-between mt-4 bg-gray-50 rounded-lg p-2">
                        <span className="text-sm font-semibold text-gray-600">Qty (kg):</span>
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => handleDecrement(sweet._id)} 
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 font-bold text-gray-700"
                          >
                            -
                          </button>
                          <span className="font-bold text-gray-800 w-4 text-center">{selectedQty}</span>
                          <button 
                            onClick={() => handleIncrement(sweet._id, sweet.quantity)} 
                            disabled={selectedQty >= sweet.quantity} 
                            className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-white transition ${selectedQty >= sweet.quantity ? "bg-gray-300 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Add Button */}
                    <button 
                      onClick={() => handleAddToCartClick(sweet)} 
                      disabled={isOutOfStock} 
                      className={`w-full mt-4 py-2 rounded-lg font-semibold transition text-white ${isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-pink-500 to-rose-600 hover:opacity-90 shadow-md"}`}
                    >
                      {isOutOfStock ? "Unavailable" : `Add ${selectedQty * sweet.price} ₹ to Cart`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;