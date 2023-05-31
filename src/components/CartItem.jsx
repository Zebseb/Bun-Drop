import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function CartItem(props) {
  const [product, setProduct] = useState({});
  const [itemPrice, setItemPrice] = useState(0);
  let item = props.item;

  useEffect(() => {
    getProduct();
  }, [item]);

  useEffect(() => {
    calculatePrice();
  }, [product]);

  async function getProduct() {
    await fetch(`http://localhost:7001/products/${item.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }

  function handleSubtractVolume() {
    let cartItems = localStorage.getItem("cartItem");
    cartItems = JSON.parse(cartItems);

    if (item.volume === 1) {
      let cartItemsToKeep = cartItems.filter((i) => i.id !== item.id);

      localStorage.setItem("cartItem", JSON.stringify(cartItemsToKeep));
    } else if (item.volume > 1) {
      let cartItemToChange = cartItems.find((i) => i.id === item.id);

      cartItemToChange.volume -= 1;

      let indexOfItem = cartItems.findIndex((i) => i.name === item.name);
      console.log(`index of ${indexOfItem}`);

      cartItems.splice(indexOfItem, 1, cartItemToChange);

      localStorage.setItem("cartItem", JSON.stringify(cartItems));
    }

    // HÄMTA CARTITEMS PÅ NYTT FÖR ATT DYNAMISKT
    // LADDA OM SIDAN MED NYA VÄRDEN!
  }

  function handleAddVolume() {
    let cartItems = localStorage.getItem("cartItem");
    cartItems = JSON.parse(cartItems);

    let cartItemToChange = cartItems.find((i) => i.id === item.id);

    cartItemToChange.volume += 1;

    let indexOfItem = cartItems.findIndex((i) => i.name === item.name);
    console.log(`index of ${indexOfItem}`);

    cartItems.splice(indexOfItem, 1, cartItemToChange);

    localStorage.setItem("cartItem", JSON.stringify(cartItems));

    // HÄMTA CARTITEMS PÅ NYTT FÖR ATT DYNAMISKT
    // LADDA OM SIDAN MED NYA VÄRDEN!
  }

  function removeCartItem() {
    let cartItems = localStorage.getItem("cartItem");
    cartItems = JSON.parse(cartItems);

    let cartItemsToKeep = cartItems.filter((i) => i.id !== item.id);

    localStorage.setItem("cartItem", JSON.stringify(cartItemsToKeep));
  }

  function calculatePrice() {
    setItemPrice(Math.round(product.price * item.volume * 10) / 10);
  }

  return (
    <div>
      <div className="flex-div">
        <h3>{product.name}</h3>
        <button
          onClick={() => {
            handleSubtractVolume();
          }}
        >
          -
        </button>
        <span>{item.volume}</span>
        <button
          onClick={() => {
            handleAddVolume();
          }}
        >
          +
        </button>
        <img className="cart-img" src={product.image} />
        <em>{itemPrice} $</em>
        <FontAwesomeIcon
          className="trash-icon"
          icon={faTrashCan}
          onClick={removeCartItem}
        />
      </div>
    </div>
  );
}

export default CartItem;
