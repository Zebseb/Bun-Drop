import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function Cart() {
  let cartItems = localStorage.getItem("cartItem");

  if (!cartItems) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(cartItems);
  }

  function getCartItems() {
    cartItems = localStorage.getItem("cartItem");
    if (!cartItems) {
      cartItems = [];
    } else {
      cartItems = JSON.parse(cartItems);
    }
  }

  function calculateTotal() {
    let totalCost = 0;
    cartItems.map((i) => {
      totalCost += i.volume;
    });

    console.log(totalCost);
  }

  if (cartItems) {
    return (
      <div>
        <h3>Your current order...</h3>
        {cartItems.map((i) => (
          <CartItem key={i.id} item={i} getCartItems={getCartItems} />
        ))}
        <div className="flex-div">
          <h5>Total: {calculateTotal()} $</h5>
          <Link to="/checkout">
            <button className="complete-btn">Complete order</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Your cart is currently empty.</h2>
        <h2>Check out our menu to add products.</h2>
      </div>
    );
  }
}

export default Cart;
