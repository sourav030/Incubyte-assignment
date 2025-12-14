import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddSweet = () => {
  const { token, fetchSweets } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null); 
  const [formData, setFormData] = useState({
    name: "",
    category: "Barfi",
    price: "",
    quantity: "",
    imageUrl: "", 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const uploadImageToCloudinary = async () => {
    try {
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "sweetshop_preset"); 
      data.append("cloud_name", "de7kvxqk8"); 

      
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/de7kvxqk8/image/upload", 
        data
      );
      
      return res.data.secure_url; 
    } catch (error) {
      console.error("Image Upload Error:", error);
      alert("Image upload failed!");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.imageUrl;

      
      if (imageFile) {
        const uploadedUrl = await uploadImageToCloudinary();
        if (!uploadedUrl) {
          setLoading(false);
          return; 
        }
        finalImageUrl = uploadedUrl;
      }

     
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      const sweetData = { ...formData, imageUrl: finalImageUrl }; 

      await axios.post("http://localhost:5000/api/sweets", sweetData, config);
      
      await fetchSweets(); 
      alert("Sweet Added Successfully! 🍬");
      navigate("/"); 
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error adding sweet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg border border-pink-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">➕ Add New Sweet</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
       
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Sweet Name</label>
            <input type="text" name="name" required className="w-full border p-3 rounded" onChange={handleChange} />
          </div>

         
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
            <select name="category" required onChange={handleChange} className="w-full border p-3 rounded bg-white">
              <option value="Barfi">Barfi</option>
              <option value="Syrup">Syrup Based</option>
              <option value="Laddu">Laddu</option>
              <option value="Dry Fruit">Dry Fruit</option>
              <option value="Ghee">Desi Ghee</option>
            </select>
          </div>

          
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Price (₹)</label>
              <input type="number" name="price" required className="w-full border p-3 rounded" onChange={handleChange} />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Stock (kg)</label>
              <input type="number" name="quantity" required className="w-full border p-3 rounded" onChange={handleChange} />
            </div>
          </div>

          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Sweet Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])} 
              className="w-full border p-2 rounded bg-gray-50"
              required 
            />
           
            {imageFile && (
              <img src={URL.createObjectURL(imageFile)} alt="Preview" className="h-20 w-20 mt-2 object-cover rounded shadow" />
            )}
          </div>

         
          <button type="submit" disabled={loading}
            className={`w-full text-white py-3 rounded-lg font-bold transition 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-pink-500 to-rose-600 hover:shadow-lg"}`}>
            {loading ? "Uploading Image..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSweet;