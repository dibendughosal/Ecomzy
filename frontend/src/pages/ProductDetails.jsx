import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add } from "../redux/Slices/CartSlice";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        toast.error("Failed to load product");
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(add({ ...product, quantity }));
    toast.success("Added to cart");
  };

  if (!product) return <p className="text-center py-10 text-lg">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Image */}
      <div className="bg-white p-4 rounded shadow col-span-1 flex justify-center items-start">
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-h-[500px] object-contain"
        />
      </div>

      {/* Middle: Details */}
      <div className="col-span-2 flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold">{product.title}</h1>

        <div className="flex items-center gap-2">
          {/* stars */}
          {Array(5).fill(0).map((_, i) => (
            <span key={i} className={`text-xl ${i < 4 ? "text-yellow-500" : "text-gray-300"}`}>★</span>
          ))}
          <span className="text-sm text-gray-600">(120 ratings)</span>
        </div>

        <div className="text-3xl font-bold text-green-700 mt-2">${product.price}</div>

        <div className="text-sm text-gray-500">
          <p>Inclusive of all taxes</p>
          <p className="text-green-600 font-medium mt-1">In stock</p>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-4 mt-3">
          <span className="font-semibold">Quantity:</span>
          <button
            onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >-</button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity(prev => prev + 1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >+</button>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded"
          >
            Add to Cart
          </button>
          <button
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded"
          >
            Buy Now
          </button>
        </div>

        {/* Delivery info */}
        <div className="mt-4 text-sm text-gray-600">
          <p>Free delivery by <span className="font-medium text-black">Tomorrow</span> if ordered within 2 hrs.</p>
          <p>Sold by <span className="font-medium text-black">BestSellerMart</span> and fulfilled by us.</p>
        </div>
      </div>

      {/* Description section - can span full width on mobile */}
      <div className="md:col-span-3 mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Product Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
