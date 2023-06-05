import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

function ProductCard({ product, foundUser, updateMenu }) {
  const [isLoggedIn, setIsLoggedIn] = useState(foundUser);
  const [loggedInUser, setLoggedInUser] = useState();
  const [isFavourited, setIsFavourited] = useState();

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (foundUser) {
      getFavouriteStatus();
    }
  }, []);

  function getUser() {
    if (foundUser) {
      const parsedUser = JSON.parse(foundUser);

      fetch(`http://localhost:7001/users/${parsedUser.dbId}`)
        .then((res) => res.json())
        .then((data) => setLoggedInUser(data));
    }
  }

  async function getFavouriteStatus() {
    const parsedUser = JSON.parse(foundUser);

    const response = await fetch(
      `http://localhost:7001/users/${parsedUser.dbId}`
    );
    const user = await response.json();

    const foundProduct = user.favourites.find((p) => p.id === product.id);

    if (foundProduct) {
      setIsFavourited(true);
    }
  }

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

  async function handleFavourite() {
    const response = await fetch(
      `http://localhost:7001/users/${loggedInUser.id}`
    );
    const user = await response.json();

    const foundProduct = user.favourites.find((p) => p.id === product.id);

    if (!isFavourited) {
      if (!foundProduct) {
        user.favourites.push(product);
      }

      fetch(`http://localhost:7001/users/${loggedInUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      setIsFavourited(true);
      updateMenu();
      getUser();
    } else {
      user.favourites = user.favourites.filter((p) => p.id !== product.id);

      fetch(`http://localhost:7001/users/${loggedInUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      setIsFavourited(false);
    }
  }

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
          {isLoggedIn && !isFavourited ? (
            <span>
              <FontAwesomeIcon
                className="favourite-icon"
                icon={regularStar}
                onClick={handleFavourite}
              />
            </span>
          ) : (
            <></>
          )}
          {isLoggedIn && isFavourited ? (
            <span>
              <FontAwesomeIcon
                className="favourite-icon"
                icon={solidStar}
                onClick={handleFavourite}
              />
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
