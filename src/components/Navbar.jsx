import { NavLink } from "react-router-dom";
import logo from "../logo.png";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { cart } = useSelector(state => state);

  return (
    <div className="w-full bg-white shadow-md">
      <nav className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4">
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} alt="Logo" className="h-12 cursor-pointer" />
        </NavLink>

        {/* Search Bar */}
        <div className="flex-1 mx-6 hidden md:flex">
          <input 
            type="text" 
            placeholder="Search for products..." 
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-x-6 text-gray-700">
          <NavLink to="/login" className="hover:text-blue-600 transition">
            <FaUser className="text-xl" />
          </NavLink>
          <NavLink to="/cart" className="relative hover:text-blue-600 transition">
            <FaShoppingCart className="text-2xl" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full text-white">
                {cart.length}
              </span>
            )}
          </NavLink>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className="md:hidden px-4 py-2">
        <input 
          type="text" 
          placeholder="Search for products..." 
          className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Navbar;
