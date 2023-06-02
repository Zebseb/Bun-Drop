import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

function ProductCard({ product, foundUser }) {
  const [isLoggedIn, setIsLoggedIn] = useState(foundUser);

  function addToCart() {
    let cartItems = localStorage.getItem("cartItem");
    let cartItemToAdd;

    if (!cartItems) {
      cartItems = [];
    } else {
      cartItems = JSON.parse(cartItems);
      cartItemToAdd = cartItems.find((i) => i.id === product.id);
    }

    if (cartItemToAdd) {
      {
        cartItemToAdd.volume += 1;
      }
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        volume: 1,
        price: product.price,
      });
    }

    localStorage.setItem("cartItem", JSON.stringify(cartItems));
  }

  function handleFavourite() {}

  return (
    <div>
      <div className="product-card">
        <h4>{product.name}</h4>
        <img
          className="product-card-img"
          src={product.image}
          alt="Image of the product."
        />
        <p>{product.description}</p>
        <span>Price: </span>
        <em>{product.price}$</em>
        <div>
          <button className="add-btn" onClick={addToCart}>
            Add to cart
          </button>
          {isLoggedIn ? (
            <span>
              <FontAwesomeIcon
                className="favourite-icon"
                icon={regularStar}
                onClick={handleFavourite}
              />
            </span>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
