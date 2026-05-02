import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Header, Footer } from "./componets";
import { Home, Shop, Instant, Contacts, FAQ, Login, SignUp, Cart, Checkout, CustomSet } from "./pages";
import { fetchCurrentUser } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();

  useEffect(() => {
    if (user || token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const id = location.hash.slice(1);
    const scrollToHash = () => {
      const element = document.getElementById(id);
      if (!element) {
        return;
      }

      const headerOffset = window.innerWidth <= 430 ? 104 : 116;
      const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    };

    window.requestAnimationFrame(() => {
      window.setTimeout(scrollToHash, 80);
    });
  }, [location.pathname, location.search, location.hash]);

  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instock" element={<Instant />} />
        <Route path="/shop/:id" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/custom-set" element={<CustomSet />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
