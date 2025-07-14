import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000/api";

const AdminDashboard = () => {
  const { token, user } = useSelector(state => state.auth);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 }
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };

  const loadProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    if (user?.role === "admin") loadProducts();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "price" ? parseFloat(value) : value
    });
  };

  const handleRatingChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      rating: { ...form.rating, [name]: parseFloat(value) }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingId) {
        res = await fetch(`${BASE_URL}/products/${editingId}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(form)
        });
        if (!res.ok) throw new Error("Failed to update product");
        toast.success("Product updated");
      } else {
        res = await fetch(`${BASE_URL}/products`, {
          method: "POST",
          headers,
          body: JSON.stringify(form)
        });
        if (!res.ok) throw new Error("Failed to add product");
        toast.success("Product added");
      }

      setForm({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
        rating: { rate: 0, count: 0 }
      });
      setEditingId(null);
      loadProducts();
    } catch (err) {
      toast.error(err.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers
      });
      if (!res.ok) throw new Error("Failed to delete product");
      toast.success("Product deleted");
      loadProducts();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  const handleEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating || { rate: 0, count: 0 }
    });
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title"
            className="border p-2 rounded" required />
          <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price"
            className="border p-2 rounded" required />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category"
            className="border p-2 rounded" required />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL"
            className="border p-2 rounded" required />
        </div>
        <textarea name="description" value={form.description} onChange={handleChange}
          placeholder="Description" className="w-full border p-2 rounded" required />

        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="rate" value={form.rating.rate}
            onChange={handleRatingChange} placeholder="Rating Rate" className="border p-2 rounded" />
          <input type="number" name="count" value={form.rating.count}
            onChange={handleRatingChange} placeholder="Rating Count" className="border p-2 rounded" />
        </div>

        <button type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border rounded p-4 shadow hover:shadow-lg transition">
            <img src={p.image} alt={p.title} className="h-40 w-full object-cover rounded mb-2" />
            <h2 className="font-semibold text-lg">{p.title}</h2>
            <p className="text-green-700 font-bold mb-1">${p.price.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mb-2">{p.category}</p>
            <p className="text-sm mb-3">{p.description.slice(0, 60)}...</p>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)}
                className="flex-1 py-2 bg-yellow-400 hover:bg-yellow-500 rounded font-semibold">
                Edit
              </button>
              <button onClick={() => handleDelete(p._id)}
                className="flex-1 py-2 bg-red-500 text-white hover:bg-red-600 rounded font-semibold">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
