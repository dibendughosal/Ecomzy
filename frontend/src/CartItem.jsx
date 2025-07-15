import React from "react";
import { useDispatch } from "react-redux";
import { add, decrementQty, remove } from "./redux/Slices/CartSlice";
import toast from "react-hot-toast";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(add({ ...item, quantity: 1 }));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(decrementQty(item._id));
    } else {
      dispatch(remove(item._id));
      toast.error("Item removed from cart");
    }
  };

  const handleRemove = () => {
    dispatch(remove(item._id));
    toast.error("Item removed from cart");
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded shadow-sm bg-white">
      <div className="flex items-center gap-4">
        <img src={item.image} alt={item.title} className="h-20 w-20 object-contain rounded" />
        <div>
          <h3 className="font-semibold text-gray-800">{item.title}</h3>
          <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleDecrement}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >-</button>
        <span className="font-semibold">{item.quantity}</span>
        <button
          onClick={handleIncrement}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >+</button>
      </div>

      <div className="text-green-700 font-bold w-24 text-center">
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      <button
        onClick={handleRemove}
        className="text-red-600 hover:underline ml-2 text-sm"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
