import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: ""
  });

  const { token, user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  if (!token || user.role !== "admin") {
    toast.error("Unauthorized access");
    navigate("/");
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add product");

      toast.success("Product added successfully");
      navigate("/home");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Product</h2>
      {Object.entries(formData).map(([key, value]) => (
        <div className="mb-4" key={key}>
          <label className="block text-sm font-medium mb-1 capitalize">{key}</label>
          <input
            type="text"
            name={key}
            value={value}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      ))}
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};

export default AddProduct;