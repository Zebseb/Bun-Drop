import React, { useState } from "react";
import SwishSvg from "../../public/images/swish-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

function Checkout() {
  const [cardRadioBtn, setCardRadioBtn] = useState(true);
  const [swishRadioBtn, setSwishRadioBtn] = useState(false);

  function handleRadioButtons() {
    if (cardRadioBtn) {
      setSwishRadioBtn(true);
      setCardRadioBtn(false);
    } else {
      setSwishRadioBtn(false);
      setCardRadioBtn(true);
    }
  }

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
        <button className="complete-btn">Checkout</button>
      </div>
    </div>
  );
}

export default Checkout;
