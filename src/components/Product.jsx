import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/Slices/CartSlice";

const Product = ({item}) => {
  const {cart} = useSelector((state) => state);
  // console.log(item)
  // console.log("Cart:", cart);
  // console.log("Item ID:", item.id);

  const dispatch = useDispatch();

  const addToCart = () => {
    console.log("Adding to Cart:", item);
    dispatch(add(item))
    toast.success("Item added to Cart");
  }
  const removeFromCart = () => {
    console.log("Removing from Cart:", item.id);
    dispatch(remove(item.id))
    toast.error("Item removed from cart");
  }


  return (
  <div className="mx-auto">
    <div key={item.id} className="w-[300px] h-[400px] p-4 border mt-10 border-gray-300 rounded-xl flex flex-col gap-y-3 items-center justify-between hover:shadow-2xl hover:scale-110 transition duration-300 ease-in bg-gray-50">
              <h3 className="font-semibold text-lg truncate mt-1 text-gray-700  w-40">{item.title.split(" ").splice(0,3).join(" ")+"..."}</h3>
              <h3 className="w-40 text-gray-400 font-normal text-[10px] ">{item.description.split(' ').splice(0, 10).join(" ")+"..."}</h3>
              <img src={item.image} alt="img" className="h-[180px]" />
              <div className="flex justify-between w-full items-center">
                <p className="font-bold text-green-600 text-sm">${item.price}</p>
                {
                cart.some((p) => p.id == item?.id) ?
                (
                  <button onClick={removeFromCart} className="rounded-full uppercase border-2 p-1 px-3 text-gray-700 font-bold text-center border-black hover:bg-gray-700 hover:text-white transition duration-200 ease-in">
                    Remove Item
                  </button>
                )
                : (<button onClick={addToCart} className="rounded-full uppercase border-2 p-1 px-3 text-gray-700 font-bold text-center border-black hover:bg-gray-700 hover:text-white transition duration-200 ease-in">
                    Add to Cart
                  </button>)
                }
              </div>
              
              
    </div>
  </div>);
};

export default Product;
