import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function Cart() {
  const [cartItems, setCartItems] = useState(getCart);

  function getCart() {
    const jsonCart = localStorage.getItem("cartItem");

    if (jsonCart) {
      const cart = JSON.parse(jsonCart);
      return cart;
    } else {
      return [];
    }
  }

  function updateCartItems() {
    setCartItems(getCart);
  }

  function deleteCartItem(id) {
    let cartItemsToKeep = cartItems.filter((i) => i.id !== id);
    setCartItems(cartItemsToKeep);
  }

  function calculateTotal() {
    let totalCost = 0;
    cartItems.map((i) => {
      totalCost += i.volume * i.price;
    });

    totalCost = Math.round(totalCost * 10) / 10;
    return totalCost;
  }

  if (cartItems.length > 0) {
    return (
      <div>
        <h3>Your current order...</h3>
        {cartItems.map((i) => (
          <CartItem
            key={i.id}
            item={i}
            deleteCartItem={deleteCartItem}
            updateCartItems={updateCartItems}
          />
        ))}
        <div className="flex-div">
          <h4>Total: {calculateTotal()} $</h4>
          <Link to="/checkout">
            <button className="complete-btn">Complete order</button>
          </Link>
        </div>
      </div>
    );
  } else if (!cartItems) {
    return <div>Loading...</div>;
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
