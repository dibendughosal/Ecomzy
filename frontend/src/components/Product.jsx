import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/Slices/CartSlice";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Product = ({ item }) => {
  const { cart } = useSelector(state => state);
  const dispatch = useDispatch();

  const addToCart = (e) => {
    e.stopPropagation();
    dispatch(add(item));
    toast.success("Item added to Cart");
  };

  const removeFromCart = (e) => {
    e.stopPropagation();
    dispatch(remove(item._id));
    toast.error("Item removed from Cart");
  };

  return (
    <NavLink to={`/product/${item._id}`}>
      <div className="relative mx-auto">
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
          Save 15%
        </div>

        <div className="w-[300px] p-4 border border-gray-200 rounded-xl flex flex-col gap-y-3 items-center 
          hover:shadow-xl hover:scale-[1.05] transition duration-300 bg-white">

          <img src={item.image} alt={item.name} 
            className="h-[180px] object-contain rounded" />

          <div className="w-full text-center">
            <h3 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
          </div>

          <div className="flex items-center justify-center gap-1 mt-2">
            <FaStar className="text-yellow-500 text-sm" />
            <FaStar className="text-yellow-500 text-sm" />
            <FaStar className="text-yellow-500 text-sm" />
            <FaStar className="text-yellow-500 text-sm" />
            <FaStarHalfAlt className="text-yellow-500 text-sm" />
            <span className="text-gray-600 text-xs ml-1">(4.5)</span>
          </div>

          <div className="flex justify-between items-center w-full mt-2">
            <p className="font-bold text-green-600">${item.price}</p>
            {cart.some((p) => p._id === item._id) ? (
              <button
                onClick={removeFromCart}
                className="rounded-full uppercase border px-3 py-1 text-xs font-bold 
                  text-gray-700 border-black hover:bg-gray-700 hover:text-white 
                  transform hover:scale-105 transition duration-200"
              >
                Remove
              </button>
            ) : (
              <button
                onClick={addToCart}
                className="rounded-full uppercase border px-3 py-1 text-xs font-bold 
                  text-gray-700 border-black hover:bg-gray-700 hover:text-white 
                  transform hover:scale-105 transition duration-200"
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;