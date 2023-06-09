import React, { useState, useEffect } from "react";
import SwishSvg from "../../public/images/swish-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { Popup } from "../components/Popup/CheckoutPopUp";

function Checkout() {
  const [errorMsg, setErrorMsg] = useState("");
  const [signedInUser, setSignedInUser] = useState();
  const [user, setUser] = useState({});
  const [cartItems, setCartItems] = useState(getCart);
  const [order, setOrder] = useState();
  const [fullAddress, setFullAddress] = useState("");
  const [finishedOrder, setFinishedOrder] = useState(false);
  const [cardRadioBtn, setCardRadioBtn] = useState(true);
  const [swishRadioBtn, setSwishRadioBtn] = useState(false);
  const [open, setOpen] = useState(false);
  const [randomTime, setRandomTime] = useState(0);
  const [userInfo, setUserInfo] = useState({
    cardName: "",
    cardNumber: 0,
    expiration: "",
    cvc: 0,
    city: "",
    street: "",
    no: 0,
    swishNumber: 0,
  });

  useEffect(() => {
    getSignedInUser();
  }, []);

  useEffect(() => {
    getUser();
  }, [signedInUser]);

  useEffect(() => {
    getOrder();
  }, [finishedOrder]);

  function getSignedInUser() {
    const jsonUser = localStorage.getItem("signedIn");

    if (jsonUser) {
      const user = JSON.parse(jsonUser);
      setSignedInUser(user);
    } else {
      return [];
    }
  }

  async function getUser() {
    if (signedInUser) {
      await fetch(`http://localhost:7001/users/${signedInUser.dbId}`)
        .then((res) => res.json())
        .then((data) => setUser(data));
    } else {
    }
  }

  function handleRadioButtons() {
    if (cardRadioBtn) {
      setSwishRadioBtn(true);
      setCardRadioBtn(false);
    } else {
      setSwishRadioBtn(false);
      setCardRadioBtn(true);
    }
  }

  function handleInput() {
    setErrorMsg("");
    let isOkInput = false;

    if (cardRadioBtn) {
      if (
        userInfo.cardName.length > 3 &&
        userInfo.cardNumber.toString().length >= 4 &&
        userInfo.expiration.length === 5 &&
        userInfo.cvc.toString().length === 3
      ) {
        setOpen(true);
        setRandomTime(Math.round(Math.random() * 50));

        if (!signedInUser) {
          localStorage.removeItem("cartItem");
        }
        isOkInput = true;
      } else {
        setErrorMsg("Expiration needs to be 5 numbers and CVC needs to be 3.");
      }
    } else {
      if (userInfo.swishNumber.toString().length >= 4) {
        setOpen(true);
        setRandomTime(Math.round(Math.random() * 50));

        if (!signedInUser) {
          localStorage.removeItem("cartItem");
        }
        isOkInput = true;
      } else {
        setErrorMsg(`Use only numbers (minimum 4), + is not allowed!`);
      }
    }

    if (signedInUser && isOkInput) {
      getOrder();
      saveOrder();
    }
  }

  function getOrder() {
    const checkOutOrder = {
      company: "",
      date: "",
      items: [],
      payment: "",
      address: "",
    };

    setOrder(checkOutOrder);
  }

  async function saveOrder() {
    const response = await fetch(`http://localhost:7001/users/${user.id}`);
    const dbUser = await response.json();

    if (order) {
      let paymentType;
      if (cardRadioBtn) {
        paymentType = "Debit Card";
      } else {
        paymentType = "Swish";
      }

      const checkOutOrder = {
        company: "Bun Drop",
        date: getDate(),
        items: cartItems,
        payment: paymentType,
        address: `${userInfo.city}, ${userInfo.street} ${userInfo.no}`,
      };

      dbUser.orders.push(checkOutOrder);
      localStorage.removeItem("cartItem");
    }

    fetch(`http://localhost:7001/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dbUser),
    });
  }

  function getCart() {
    const jsonCart = localStorage.getItem("cartItem");

    if (jsonCart) {
      const cart = JSON.parse(jsonCart);
      return cart;
    } else {
      return [];
    }
  }

  function getDate() {
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    const time = `${current.getHours()}:${current.getMinutes()}`;

    return `${date} - ${time}`;
  }

  function handleCardName(e) {
    setUserInfo({ ...userInfo, cardName: e.target.value });
  }

  function handleCardNumber(e) {
    setUserInfo({ ...userInfo, cardNumber: e.target.value });
  }

  function handleExpiration(e) {
    setUserInfo({ ...userInfo, expiration: e.target.value });
  }

  function handleCVC(e) {
    setUserInfo({ ...userInfo, cvc: e.target.value });
  }

  function handleCity(e) {
    setUserInfo({ ...userInfo, city: e.target.value });
  }

  function handleStreet(e) {
    setUserInfo({ ...userInfo, street: e.target.value });
  }

  function handleNo(e) {
    setUserInfo({ ...userInfo, no: e.target.value });
  }

  function handleSwish(e) {
    setUserInfo({ ...userInfo, swishNumber: e.target.value });
  }

  return (
    <div>
      <div className="checkout-opacity-div">
        <div className="flex-body">
          <h4>Payment method</h4>
          <div className="flex-div">
            <div>
              <div className="flex-div payment-choice-div flex-start">
                <input
                  type="radio"
                  checked={cardRadioBtn}
                  onChange={handleRadioButtons}
                />
                <h5>Debit card</h5>
                <FontAwesomeIcon className="card-icon" icon={faCreditCard} />
              </div>
              <div className="flex-div payment-choice-div flex-start">
                <input
                  type="radio"
                  checked={swishRadioBtn}
                  onChange={handleRadioButtons}
                />
                <h5>Swish</h5>
                <img className="swish-logo" src={SwishSvg} />
              </div>
            </div>
            <div className="flex-div">
              {cardRadioBtn ? (
                <div className="flex-column">
                  <input
                    className="checkout-input"
                    type="text"
                    placeholder="Card name"
                    onChange={handleCardName}
                  />
                  <input
                    className="checkout-input"
                    type="number"
                    placeholder="Card number"
                    onChange={handleCardNumber}
                  />
                  <div className="flex-div">
                    <input
                      className="checkout-input input-small"
                      type="text"
                      placeholder="MM/YY"
                      onChange={handleExpiration}
                    />
                    <input
                      className="checkout-input input-small"
                      type="number"
                      placeholder="CVC"
                      onChange={handleCVC}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-column">
                  <input className="checkout-input dark-bg" disabled />
                  <input className="checkout-input dark-bg" disabled />
                  <div className="flex-div">
                    <input
                      className="checkout-input swish-input"
                      type="number"
                      placeholder="Swish number"
                      onChange={handleSwish}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="flex-body">
            <h4>Delivery information</h4>
            <form className="flex-column">
              <input
                className="checkout-input"
                id="city-input"
                type="text"
                placeholder="City"
                onChange={handleCity}
              />
              <input
                className="checkout-input"
                id="street-input"
                type="text"
                placeholder="Street"
                onChange={handleStreet}
              />
              <input
                className="checkout-input"
                type="number"
                placeholder="No."
                onChange={handleNo}
              />
            </form>
            <p className="checkout-error">{errorMsg}</p>
          </div>
        </div>
      </div>
      <div className="flex-div">
        <button onClick={handleInput} className="complete-btn">
          Checkout
        </button>
        {open ? (
          <Popup
            thanksText={`Thanks for ordering!`}
            orderText={`Your food will be delivered in ${randomTime} minutes.`}
            closePopup={() => setOpen(false)}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Checkout;
