import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { token, user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0
    }
  });

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      toast.error("Admin access only!");
      navigate("/login");
    }
  }, [token, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("rating.")) {
      const field = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        rating: { ...prev.rating, [field]: field === "rate" || field === "count" ? parseFloat(value) : value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === "price" ? parseFloat(value) : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to add product");

      toast.success("Product added successfully!");
      navigate("/admin");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Add New Product</h2>

      {/* Product fields */}
      {["title", "price", "description", "category", "image"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
          <input
            type={field === "price" ? "number" : "text"}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      {/* Rating fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Rating Rate</label>
          <input
            type="number"
            name="rating.rate"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating.rate}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rating Count</label>
          <input
            type="number"
            name="rating.count"
            min="0"
            value={formData.rating.count}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button 
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-semibold"
      >
        Submit
      </button>
    </form>
  );
};

export default AddProduct;
