import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./presentational/Header";
import Footer from "./presentational/Footer";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Cart from "./routes/Cart";
import Checkout from "./routes/Checkout";
import Menu from "./routes/Menu";
import Profile from "./routes/Profile";
import About from "./routes/About";
import Contact from "./routes/Contact";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
