import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function CartItem(props) {
  const [product, setProduct] = useState({});
  const [item, setItem] = useState({ volume: props.item.volume, price: 0 });

  useEffect(() => {
    getProduct();
  }, [product]);

  useEffect(() => calculatePrice(), [product]);

  async function getProduct() {
    await fetch(`http://localhost:7001/products/${props.item.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }

  function handleSubtractVolume() {
    let cartItems = localStorage.getItem("cartItem");
    cartItems = JSON.parse(cartItems);

    if (item.volume === 1) {
      let cartItemsToKeep = cartItems.filter((i) => i.id !== props.item.id);

      localStorage.setItem("cartItem", JSON.stringify(cartItemsToKeep));

      props.deleteCartItem(props.item.id);
      if (cartItemsToKeep.length === 0) {
        localStorage.removeItem("cartItem");
      }
    } else if (item.volume > 1) {
      let cartItemToChange = cartItems.find((i) => i.id === props.item.id);

      cartItemToChange.volume -= 1;

      setItem({ ...item, volume: cartItemToChange.volume });

      let indexOfItem = cartItems.findIndex((i) => i.name === item.name);

      cartItems.slice(indexOfItem, 1, cartItemToChange);

      localStorage.setItem("cartItem", JSON.stringify(cartItems));

      props.updateCartItems();
    }
  }

  function handleAddVolume() {
    let cartItems = localStorage.getItem("cartItem");
    cartItems = JSON.parse(cartItems);

    let cartItemToChange = cartItems.find((i) => i.id === props.item.id);

    cartItemToChange.volume += 1;

    setItem({ ...item, volume: cartItemToChange.volume });

    let indexOfItem = cartItems.findIndex((i) => i.name === props.item.name);

    cartItems.slice(indexOfItem, 1, cartItemToChange);

    localStorage.setItem("cartItem", JSON.stringify(cartItems));

    props.updateCartItems();
  }

  function removeCartItem() {
    let cartItems = localStorage.getItem("cartItem");
    cartItems = JSON.parse(cartItems);

    let cartItemsToKeep = cartItems.filter((i) => i.id !== props.item.id);

    localStorage.setItem("cartItem", JSON.stringify(cartItemsToKeep));

    props.deleteCartItem(props.item.id);
    if (cartItemsToKeep.length === 0) {
      localStorage.removeItem("cartItem");
    }
  }

  function calculatePrice() {
    setItem({
      ...item,
      price: Math.round(product.price * item.volume * 10) / 10,
    });
  }

  return (
    <div className="cart-grid-container">
      <div>
        <div>
          <h3 className="cart-grid-name">{product.name}</h3>
        </div>
      </div>
      <div className="cart-volume-div">
        <div>
          <button
            className="volume-btn"
            onClick={() => {
              handleSubtractVolume();
            }}
          >
            -
          </button>
        </div>
        <div>
          <span>{item.volume}</span>
        </div>
        <div>
          <button
            className="volume-btn"
            onClick={() => {
              handleAddVolume();
            }}
          >
            +
          </button>
        </div>
      </div>
      <div>
        <img className="cart-img" src={product.image} />
      </div>
      <div>
        <em>{item.price} $</em>
      </div>
      <div className="flex-column">
        <div className="bin-div">
          <FontAwesomeIcon
            className="trash-icon"
            icon={faTrashCan}
            onClick={removeCartItem}
          />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
