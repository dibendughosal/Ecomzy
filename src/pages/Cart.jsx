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
          <div>
            <div>
              {
                cart.map((item, idx) => {
                  return <CartItem key={item.id} item={item} itemIndex={idx}/>

                })
              }
            </div>

            <div>

              <div>
                <h1>Your Cart</h1>
                <h2>Summary</h2>
                <p>
                  <span>Total Items: {cart.length}</span>
                </p>
              </div>

              <div>
                <p>Total Amount: ${totalAmount}</p>
                <button>Checkout Now</button>
              </div>

            </div>
          </div>
         ) : 
         (
          <div>
              <p>Your cart is empty</p>
              <NavLink to='/'><button>Shop now</button></NavLink>
          </div>
         )
      }
    </div>
  );
};

export default Cart;
