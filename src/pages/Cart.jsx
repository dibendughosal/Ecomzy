import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CartItem from '../CartItem'
import { useEffect, useState } from "react";

const Cart = () => {
  const {cart} = useSelector((state => state))
  const [totalAmount,setTotalAmount] = useState(0);

  useEffect(()=> {
    setTotalAmount( cart.reduce( (acc,curr) => acc + curr.price,0) );
  },[cart])

  return (
    <div>
      {
        cart.length > 0 ?
         (
          <div className="flex w-[80%] mx-auto">
            <div>
              {
                cart.map((item, idx) => {
                  return <CartItem key={item.id} item={item} itemIndex={idx}/>

                })
              }
            </div>

            <div className="flex flex-col gap-5 my-14 justify-between h-full">

              <div>
                <h1 className="font-semibold text-xl text-green-800">Your Cart</h1>
                <h2 className="font-semibold text-5xl text-green-700 -mt-1 uppercase">Summary</h2>
              </div>
                <p className="text-xl">
                  <span className="text-gray-700 font-semibold text-xl">Total Items: {cart.length}</span>
                </p>

              <div className="text-xl">
                <p className="text-gray-700 font-semibold">Total Amount: <span className="text-black font-bold text-xl">${totalAmount}</span></p>
                <button className="bg-green-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 mt-5 ease-linear border-2 border-green-600 font-bold hover:text-green-700 p-3 text-xl w-full">Checkout Now</button>
              </div>

            </div>
          </div>
         ) : 
         (
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
              <p className="font-semibold mb-2 text-xl text-gray-700">Your cart is empty!</p>
              <NavLink to='/'><button className="bg-green-600 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-semibold hover:text-green-700 p-3 px-10 tracking-wider uppercase
">Shop now</button></NavLink>
          </div>
         )
      }
    </div>
  );
};

export default Cart;
