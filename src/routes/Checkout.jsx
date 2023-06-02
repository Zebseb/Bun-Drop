import React, { useState } from "react";
import SwishSvg from "../../public/images/swish-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { Popup } from "../components/Popup/CheckoutPopUp";

function Checkout() {
  const [cardRadioBtn, setCardRadioBtn] = useState(true);
  const [swishRadioBtn, setSwishRadioBtn] = useState(false);
  const [open, setOpen] = useState(false);
  const [randomTime, setRandomTime] = useState(0);

  function handleRadioButtons() {
    if (cardRadioBtn) {
      setSwishRadioBtn(true);
      setCardRadioBtn(false);
    } else {
      setSwishRadioBtn(false);
      setCardRadioBtn(true);
    }
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
              <input type="text" placeholder="Card name" />
              <input type="number" placeholder="Card number" />
              <div className="flex-div">
                <input typ="number" placeholder="MM/YY" />
                <input type="number" placeholder="CVC" />
              </div>
            </div>
          </div>
          <div>
            <form className="flex-column">
              <h4>Info:</h4>
              <label htmlFor="city-input">City</label>
              <input id="city-input" type="text" />
              <label htmlFor="street-input">Street</label>
              <input id="street-input" type="text" />
              <label htmlFor="number-input">No.</label>
              <input type="number" />
            </form>
          </div>
        </div>
        <div className="flex-div">
          <button
            onClick={() => {
              setOpen(true);
              setRandomTime(Math.round(Math.random() * 50));
            }}
            className="complete-btn"
          >
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
            <input type="number" placeholder="Swish number" />
          </div>
          <div>
            <form className="flex-column">
              <h4>Info:</h4>
              <label htmlFor="city-input">City</label>
              <input id="city-input" type="text" />
              <label htmlFor="street-input">Street</label>
              <input id="street-input" type="text" />
              <label htmlFor="number-input">No.</label>
              <input type="number" />
            </form>
          </div>
        </div>
        <div className="flex-div">
          <button
            onClick={() => {
              setOpen(true);
              setRandomTime(Math.round(Math.random() * 50));
            }}
            className="complete-btn"
          >
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
