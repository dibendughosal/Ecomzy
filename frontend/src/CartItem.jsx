import React from "react";
import { useDispatch } from "react-redux";
import { remove, add } from "../src/redux/Slices/CartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const incrementQty = () => {
    dispatch(add({ ...item, quantity: 1 }));
  };

  const decrementQty = () => {
    if (item.quantity > 1) {
      dispatch({
        type: "cart/decrementQty",
        payload: item.id,
      });
    } else {
      dispatch(remove(item.id));
    }
  };

  return (
    <div className="flex items-center justify-between p-4 mb-3 rounded shadow hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
        <div>
          <p className="font-semibold">{item.title}</p>
          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={decrementQty}
          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
        >
          −
        </button>
        <span className="min-w-[24px] text-center">{item.quantity}</span>
        <button
          onClick={incrementQty}
          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={() => dispatch(remove(item.id))}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
