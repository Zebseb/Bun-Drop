import React from "react";
import { Link } from "react-router-dom";
import "./Popup.css";

export const Popup = ({ thanksText, orderText, closePopup }) => {
  return (
    <div className="popup-container">
      <div className="popup-body">
        <h1>{thanksText}</h1>
        <em>{orderText}</em>
        <Link to="/">
          <button className="complete-btn" onClick={closePopup}>
            Close X
          </button>
        </Link>
      </div>
    </div>
  );
};
