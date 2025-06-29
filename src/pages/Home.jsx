import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRanges, setPriceRanges] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);

  async function fetchProductData() {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPosts(data);
      setDisplayPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  // filtering and sorting
  useEffect(() => {
    let filtered = [...posts];

    // category filter
    if (category !== "All") {
      filtered = filtered.filter(item => item.category === category);
    }

    // price ranges filter
    if (priceRanges.length > 0) {
      filtered = filtered.filter(item => {
        return priceRanges.some(range => {
          if (range === "under500") return item.price < 500;
          if (range === "500-1000") return item.price >= 500 && item.price <= 1000;
          if (range === "above1000") return item.price > 1000;
          return true;
        });
      });
    }

    // rating filter (fakestoreapi doesn't have ratings, but let's pretend by using id % 5)
    if (ratingFilter > 0) {
      filtered = filtered.filter(item => (item.id % 5) >= ratingFilter);
    }

    // sort
    if (sortOption === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => (b.id % 5) - (a.id % 5)); // fake rating sort
    }

    setDisplayPosts(filtered);
  }, [sortOption, category, priceRanges, ratingFilter, posts]);

  const categories = ["All", "electronics", "jewelery", "men's clothing", "women's clothing"];

  const handlePriceChange = (range) => {
    setPriceRanges(prev =>
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  return (
    <div className="max-w-7xl flex flex-col md:flex-row gap-6 px-4 py-8">
      {/* Left panel */}
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
          <label className="flex items-center">
            <input type="checkbox" className="mr-2"
              checked={priceRanges.includes("under500")}
              onChange={() => handlePriceChange("under500")}
            />
            Under ₹500
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2"
              checked={priceRanges.includes("500-1000")}
              onChange={() => handlePriceChange("500-1000")}
            />
            ₹500 - ₹1000
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2"
              checked={priceRanges.includes("above1000")}
              onChange={() => handlePriceChange("above1000")}
            />
            Above ₹1000
          </label>
        </div>

        <h3 className="text-lg font-bold mb-3">Ratings</h3>
        <div className="space-y-2">
          {[4,3,2,1].map(star => (
            <div key={star} className="flex items-center cursor-pointer" onClick={() => setRatingFilter(star)}>
              <div className="flex">
                {Array.from({length: star}, (_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
                {Array.from({length: 5-star}, (_, i) => (
                  <span key={i} className="text-gray-300">★</span>
                ))}
              </div>
              <span className="ml-2">{star} & up</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
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
        ) : displayPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPosts.map(item => (
              <Product key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center"><p>No Data Found</p></div>
        )}
      </div>
    </div>
  );
};

export default Home;
