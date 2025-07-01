import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaArrowRight } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-gray-300 border-t border-slate-700 relative bottom-0">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div>
          <h3 className="text-2xl font-bold mb-4 text-white">EcomzyStore</h3>
          <p className="text-gray-400">
            Premium shopping experience with top-quality products & unbeatable prices.
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="#" className="hover:text-blue-400 transition"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-pink-400 transition"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-sky-400 transition"><FaTwitter size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
          <ul className="space-y-3">
            <li><Link to="/about" className="flex items-center hover:text-blue-400"><FaArrowRight className="mr-2" /> About Us</Link></li>
            <li><Link to="/contact" className="flex items-center hover:text-blue-400"><FaArrowRight className="mr-2" /> Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
          <ul className="space-y-3">
            <li><Link to="/faq" className="flex items-center hover:text-blue-400"><FaArrowRight className="mr-2" /> FAQ</Link></li>
            <li><Link to="/help-center" className="flex items-center hover:text-blue-400"><FaArrowRight className="mr-2" /> Help Center</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
          <ul className="space-y-3">
            <li><Link to="/privacy-policy" className="flex items-center hover:text-blue-400"><FaArrowRight className="mr-2" /> Privacy Policy</Link></li>
            <li><Link to="/terms" className="flex items-center hover:text-blue-400"><FaArrowRight className="mr-2" /> Terms & Conditions</Link></li>
          </ul>
        </div>

      </div>
      <div className="border-t border-slate-700 mt-8 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Ecomzy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
