import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRanges, setPriceRanges] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const categories = ["All", "electronics", "jewelery", "men's clothing", "women's clothing"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setAllProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...allProducts];

    if (category !== "All") {
      filtered = filtered.filter(item => item.category === category);
    }

    if (priceRanges.length > 0) {
      filtered = filtered.filter(item => 
        priceRanges.some(range => {
          if (range === "under500") return item.price < 500;
          if (range === "500-1000") return item.price >= 500 && item.price <= 1000;
          if (range === "above1000") return item.price > 1000;
          return true;
        })
      );
    }

    if (ratingFilter > 0) {
      filtered = filtered.filter(item => item.rating?.rate >= ratingFilter);
    }

    if (sortOption === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    setFilteredProducts(filtered);
  }, [category, priceRanges, ratingFilter, sortOption, allProducts]);

  const togglePriceRange = (range) => {
    setPriceRanges(prev =>
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 px-4 py-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-300 pr-4 pb-6 md:pb-0">
        <h3 className="text-lg font-bold mb-4">Categories</h3>
        <ul className="space-y-2 mb-6">
          {categories.map(cat => (
            <li
              key={cat}
              onClick={() => setCategory(cat)}
              className={`cursor-pointer hover:text-blue-600 ${
                category === cat ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-bold mb-3">Price</h3>
        <div className="space-y-2 mb-6">
          {["under500", "500-1000", "above1000"].map(range => (
            <label key={range} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={priceRanges.includes(range)}
                onChange={() => togglePriceRange(range)}
              />
              {{
                under500: "Under ₹500",
                "500-1000": "₹500 - ₹1000",
                above1000: "Above ₹1000"
              }[range]}
            </label>
          ))}
        </div>

        <h3 className="text-lg font-bold mb-3">Ratings</h3>
        <div className="space-y-2">
          {[4,3,2,1].map(star => (
            <div
              key={star}
              className="flex items-center cursor-pointer"
              onClick={() => setRatingFilter(star)}
            >
              <div className="flex">
                {Array.from({length: star}, (_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
                {Array.from({length: 5 - star}, (_, i) => (
                  <span key={i} className="text-gray-300">★</span>
                ))}
              </div>
              <span className="ml-2">{star} & up</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex justify-end mb-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            <option value="">Sort by</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {loading ? (
          <Spinner />
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(item => (
              <Product key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <p>No Products Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
