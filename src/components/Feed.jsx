import React from "react";
import Product from "./Product"; 
import { useSelector } from "react-redux";

const Feed = () => {
  const products = useSelector((state) => state.products); 
  // or use a static products array for now

  return (
    <div className="max-w-7xl mx-auto flex gap-6 px-4 py-8">
      {/* Left panel */}
      <div className="w-64 hidden md:block border-r border-gray-300 pr-4">
        <h3 className="text-lg font-bold mb-4">Categories</h3>
        <ul className="space-y-2">
          <li className="hover:text-blue-600 cursor-pointer">Electronics</li>
          <li className="hover:text-blue-600 cursor-pointer">Fashion</li>
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">Books</li>
          <li className="hover:text-blue-600 cursor-pointer">Sports</li>
        </ul>

        <h3 className="text-lg font-bold mt-8 mb-4">Price</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Under ₹500
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            ₹500 - ₹1000
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Above ₹1000
          </label>
        </div>
      </div>

      {/* Right product grid */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-6">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <Product key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
