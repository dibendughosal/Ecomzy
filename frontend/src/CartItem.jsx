import { FcDeleteDatabase } from "react-icons/fc";
import { remove } from "./redux/Slices/CartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const CartItem = ({item, itemIndex}) => {
  const dispatch = useDispatch();
  const removeFromCart = () => {
    dispatch(remove(item.id))
    toast.error("Item removed");
  }
  console.log(item)
  return (
    <div className="flex items-center p-2 md:p-5 
">
      <div key={itemIndex} className="flex justify-between gap-x-5 mt-2 mb-2 md:mx-5 border-b-2 py-5 border-gray-300 w-[600px]">
        <div>
          <img src={item.image} alt="item-image" className="w-[200px]"/>
        </div>
        <div className="flex flex-col gap-5 items-center md:p-3">
          <h1 className="text-xl text-slate-700 font-semibold">{item.title}</h1>
          <h1 className="text-base font-medium text-slate-700">{item.description.split(" ").splice(0,15).join(" ") +"..."}</h1>
          <div className="flex w-full p-4 items-center justify-between">
            <p className="font-bold text-lg text-green-600">${item.price}</p>
            <div onClick={removeFromCart} className="bg-red-200 rounded-full p-3 mr-3 cursor-pointer hover:bg-red-400 group">
              <FcDeleteDatabase className="text-red-800 group-hover:text-white"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
