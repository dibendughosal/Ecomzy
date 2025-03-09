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
  <div>
    <div key={item.id}>
              <h3 className="font-bold">{item.title}</h3>
              <h3>{item.description}</h3>
              <img src={item.image} alt="img" />
              <p>${item.price}</p>
              
              {
                cart.some((p) => p.id == item?.id) ?
                (
                  <button onClick={removeFromCart}>Remove Item</button>
                )
                : (<button onClick={addToCart}>
                    Add to Cart
                  </button>)
              }
    </div>
  </div>);
};

export default Product;
