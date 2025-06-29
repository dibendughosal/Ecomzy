import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <div className="w-full h-full">
      <div>
        <Navbar/>
      </div>
      <Routes>
        <Route path= "/" element={<Home/>} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>

      </Routes>
    </div>
  )
};

export default App;
