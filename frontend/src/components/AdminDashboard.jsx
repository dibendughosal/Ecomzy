import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { token } = useSelector(state => state.auth);
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", price: "", description: "", category: "", image: "" });

  const loadProducts = () => {
    fetch("/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(loadProducts, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async e => {
    e.preventDefault();
    await fetch("/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });
    loadProducts();
    setForm({ title: "", price: "", description: "", category: "", image: "" });
  };

  const handleUpdate = async id => {
    await fetch(`/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });
    loadProducts();
    setEditing(null);
    setForm({ title: "", price: "", description: "", category: "", image: "" });
  };

  const handleDelete = async id => {
    await fetch(`/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    loadProducts();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Add / Edit form */}
      <form onSubmit={editing ? (e) => {e.preventDefault(); handleUpdate(editing);} : handleAdd}
        className="space-y-2 max-w-md mb-6">
        {["title", "price", "description", "category", "image"].map(field => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            className="w-full p-2 border rounded"
            required
          />
        ))}
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          {editing ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p._id} className="border rounded p-4 shadow relative">
            <img src={p.image} alt={p.title} className="h-40 w-full object-cover rounded mb-2"/>
            <h2 className="font-semibold">{p.title}</h2>
            <p>${p.price}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => { setEditing(p._id); setForm(p); }}
                className="flex-1 p-2 bg-yellow-400 rounded hover:bg-yellow-500">Edit</button>
              <button onClick={() => handleDelete(p._id)}
                className="flex-1 p-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
