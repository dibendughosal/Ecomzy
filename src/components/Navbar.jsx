import { NavLink } from "react-router-dom";
import logo from "../logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {cart} = useSelector(state => state )
  return (
  <div className="w-full bg-slate-900">
    <nav className="flex items-center justify-between h-20 max-w-6xl mx-auto">
      <NavLink to='/'>
        <div className="ml-5">
          <img src={logo} alt="img" className="h-14"/>
        </div>
      </NavLink>
      <div className="flex items-center gap-x-6 mr-5 font-medium text-slate-100">
        <NavLink to='/'><p className="hover:scale-[1.05] transition duration-200 text-lg">Home</p></NavLink>
        <NavLink to="/cart">
        <div className="relative">
          <FaShoppingCart className="hover:scale-[1.5] transition duration-200 text-2xl"/>
            {
              cart.length > 0 && 
            <span 
            className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce rounded-full"
            >{cart.length}</span>
            }
        </div>
          
        </NavLink>
      </div>
    </nav>
  </div>

  );
};

export default Navbar;
