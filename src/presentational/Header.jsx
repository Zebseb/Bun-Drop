import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div className="flex-container">
      <div>
        <ul className="flex-div">
          <Link to="/">
            <li className="home-text margin-right">Home</li>
          </Link>
          <Link to="/about">
            <li className="margin-right">About</li>
          </Link>
          <Link to="/contact">
            <li className="margin-right">Contact</li>
          </Link>
        </ul>
      </div>
      <div>
        <Link to="/">
          <img className="logo-header" src="/images/logoblack.png" />
        </Link>
      </div>
      <div>
        <Link to="/cart">
          <FontAwesomeIcon className="header-icon" icon={faCartShopping} />
        </Link>
        <Link to="/profile">
          <FontAwesomeIcon className="header-icon" icon={faUser} />
        </Link>
      </div>
    </div>
  );
}

export default Header;
