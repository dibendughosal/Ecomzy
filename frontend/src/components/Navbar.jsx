import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaBox, FaChevronDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const { cart } = useSelector(state => state);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-white shadow-md sticky top-0 z-1000">
      <nav className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4">
        <NavLink to="/home">
          <img src={logo} alt="Logo" className="h-12 cursor-pointer" />
        </NavLink>

        <div className="flex-1 mx-6 hidden md:flex">
          <input 
            type="text" 
            placeholder="Search for products..." 
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-x-6 text-gray-700 relative pr-4">
          {user?.role === "admin" && (
            <NavLink to="/admin" className="hover:underline">
              Admin Dashboard
            </NavLink>
          )}

        </div>
        <div className="flex items-center gap-x-6 text-gray-700 relative" ref={dropdownRef}>
          {/* User dropdown */}
          <div 
            onClick={() => setDropdown(!dropdown)}
            className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition"
          >
            <FaUser className="text-xl" />
            <span className="hidden sm:inline font-medium">
              {user ? user.name.split(" ")[0] : "Guest"}
            </span>
            <FaChevronDown 
              className={`ml-1 transition-transform duration-200 ${dropdown ? "rotate-180" : "rotate-0"}`}
            />
          </div>

          {/* Animated dropdown */}
          <div
            className={`absolute top-10 right-0 w-44 bg-white shadow-lg rounded-md py-2 z-50
              transform transition-all duration-200 origin-top
              ${dropdown ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
            `}
          >
            {user ? (
              <>
                <NavLink to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <FaUser className="mr-2" /> Profile
                </NavLink>
                <NavLink to="/orders" className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <FaBox className="mr-2" /> My Orders
                </NavLink>
                <button 
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                    setDropdown(false);
                  }}
                  className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="flex items-center px-4 py-2 hover:bg-gray-100">
                  Login
                </NavLink>
                <NavLink to="/register" className="flex items-center px-4 py-2 hover:bg-gray-100">
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Cart */}
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
