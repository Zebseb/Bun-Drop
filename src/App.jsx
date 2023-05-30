import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Header from "./presentational/Header";
import Footer from "./presentational/Footer";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Cart from "./routes/Cart";
import Checkout from "./routes/Checkout";
import Menu from "./routes/Menu";

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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
