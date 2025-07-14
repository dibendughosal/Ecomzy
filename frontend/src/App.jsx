import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "./redux/authSlice";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

// Public pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ProductList from "./components/ProductList";
import ProductDetails from "./pages/ProductDetails";

// Admin pages
import AddProduct from "./pages/admin/AddProduct";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Info pages
import About from "./components/utils/About";
import Contact from "./components/utils/Contact";
import Faq from "./components/utils/FAQ";
import HelpCenter from "./components/utils/HelpCenter";
import PrivacyPolicy from "./components/utils/PrivacyPolicy";
import Terms from "./components/utils/Terms";

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        dispatch(setAuth({ user: data, token }));
      } catch (err) {
        console.error("Profile load failed", err);
      }
    };

    if (token) loadProfile();
  }, [token, dispatch]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Admin protected */}
          <Route path="/add-product" element={
            <PrivateRoute requiredRole="admin">
              <AddProduct />
            </PrivateRoute>
          } />
          <Route path="/admin" element={
            <PrivateRoute requiredRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          } />

          {/* Footer / info pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
