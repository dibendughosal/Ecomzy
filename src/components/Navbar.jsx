import { NavLink } from "react-router-dom";
import logo from "../logo.png";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
  <div className="w-full h-[90px] bg-blue-950 flex">
    <div className="flex justify-between min-w-[800px] mx-auto">
      <img src={logo} alt="img" height={60}/>
      <div className="flex items-center gap-x-6 text-white">
        <NavLink to='/'><p className="hover:scale-[1.05] transition duration-200 text-lg">Home</p></NavLink>
        <NavLink to="/cart">
          <FaShoppingCart className="hover:scale-[1.5] transition duration-200 text-2xl"/>
        </NavLink>
      </div>
    </div>
  </div>

  );
};

export default Navbar;
