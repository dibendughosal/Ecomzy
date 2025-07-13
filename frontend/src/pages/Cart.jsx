import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import CartItem from '../CartItem';
import { clearCart } from "../redux/Slices/CartSlice";

const Cart = () => {
  const { cart } = useSelector(state => state);
  const dispatch = useDispatch();

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalAmount = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="min-h-[80vh] py-10 px-4 max-w-7xl mx-auto">
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="md:col-span-2">
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white shadow rounded p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Summary</h2>
            <p className="text-lg mb-2">
              Total Items: <span className="font-semibold">{totalItems}</span>
            </p>
            <p className="text-xl font-semibold mb-6">
              Total Amount: <span className="text-green-700">${totalAmount.toFixed(2)}</span>
            </p>
            <button className="bg-green-700 hover:bg-green-800 w-full text-white py-3 rounded mb-4 transition">
              Checkout Now
            </button>
            <button 
              onClick={() => dispatch(clearCart())}
              className="border border-red-600 text-red-600 hover:bg-red-50 w-full py-2 rounded transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full py-20">
          <p className="font-semibold mb-4 text-xl text-gray-700">Your cart is empty!</p>
          <NavLink to="/">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded transition tracking-wider uppercase">
              Shop Now
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Cart;
