import React, { useState, useEffect } from "react";
import SwishSvg from "../../public/images/swish-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { Popup } from "../components/Popup/CheckoutPopUp";

function Checkout() {
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
    console.log(userInfo.city, userInfo.street, userInfo.no);

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
      }
    } else {
      if (userInfo.swishNumber.toString().length >= 4) {
        setOpen(true);
        setRandomTime(Math.round(Math.random() * 50));

        if (!signedInUser) {
          localStorage.removeItem("cartItem");
        }
      }
    }

    if (signedInUser) {
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
      console.log(checkOutOrder);
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

  if (cardRadioBtn) {
    return (
      <div>
        <div>
          <h2>Payment</h2>
        </div>
        <div className="checkout-grid">
          <div>
            <h4>Payment method</h4>
            <form>
              <div className="flex-div">
                <input
                  type="radio"
                  checked={cardRadioBtn}
                  onChange={handleRadioButtons}
                />
                <h5>Debit card</h5>
                <FontAwesomeIcon className="card-icon" icon={faCreditCard} />
              </div>
              <div className="flex-div">
                <input
                  type="radio"
                  checked={swishRadioBtn}
                  onChange={handleRadioButtons}
                />
                <h5>Swish</h5>
                <img className="swish-logo" src={SwishSvg} />
              </div>
            </form>
          </div>
          <div className="flex-div">
            <div className="flex-column">
              <input
                type="text"
                placeholder="Card name"
                onChange={handleCardName}
              />
              <input
                type="number"
                placeholder="Card number"
                onChange={handleCardNumber}
              />
              <div className="flex-div">
                <input
                  type="text"
                  placeholder="MM/YY"
                  onChange={handleExpiration}
                />
                <input type="number" placeholder="CVC" onChange={handleCVC} />
              </div>
            </div>
          </div>
          <div>
            <form className="flex-column">
              <h4>Info:</h4>
              <label htmlFor="city-input">City</label>
              <input id="city-input" type="text" onChange={handleCity} />
              <label htmlFor="street-input">Street</label>
              <input id="street-input" type="text" onChange={handleStreet} />
              <label htmlFor="number-input">No.</label>
              <input type="number" onChange={handleNo} />
            </form>
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
  } else if (swishRadioBtn) {
    return (
      <div>
        <div>
          <h2>Payment</h2>
        </div>
        <div className="checkout-grid">
          <div>
            <h4>Payment method</h4>
            <form>
              <div className="flex-div">
                <input
                  type="radio"
                  checked={cardRadioBtn}
                  onChange={handleRadioButtons}
                />
                <h5>Debit card</h5>
                <FontAwesomeIcon className="card-icon" icon={faCreditCard} />
              </div>
              <div className="flex-div">
                <input
                  type="radio"
                  checked={swishRadioBtn}
                  onChange={handleRadioButtons}
                />
                <h5>Swish</h5>
                <img className="swish-logo" src={SwishSvg} />
              </div>
            </form>
          </div>
          <div className="flex-div">
            <input
              type="number"
              placeholder="Swish number"
              onChange={handleSwish}
            />
          </div>
          <div>
            <form className="flex-column">
              <h4>Info:</h4>
              <label htmlFor="city-input">City</label>
              <input id="city-input" type="text" onChange={handleCity} />
              <label htmlFor="street-input">Street</label>
              <input id="street-input" type="text" onChange={handleStreet} />
              <label htmlFor="number-input">No.</label>
              <input type="number" onChange={handleNo} />
            </form>
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
}

export default Checkout;
