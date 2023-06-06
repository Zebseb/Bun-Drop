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
      <div className="cart-opacity-div">
        <div className="center-div">
          <h3>Your current order...</h3>
        </div>
        <div className="cart-container">
          {cartItems.map((i) => (
            <CartItem
              key={i.id}
              item={i}
              deleteCartItem={deleteCartItem}
              updateCartItems={updateCartItems}
            />
          ))}
        </div>
        <div className="flex-column center-div">
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
      <div className="center-div">
        <h3>Your cart is currently empty.</h3>
        <h3>Check out our menu to add products.</h3>
        <Link to="/menu">
          <button className="menu-button">See menu</button>
        </Link>
      </div>
    );
  }
}

export default Cart;
