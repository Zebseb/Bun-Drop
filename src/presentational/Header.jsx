import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div className="flex-container">
      <div>
        <ul className="flex-div">
          <li className="home-text margin-right">Home</li>
          <li className="margin-right">About</li>
          <li className="margin-right">Contact</li>
        </ul>
      </div>
      <div>
        <Link to="/">
          <img className="logo-header" src="/images/logoblack.png" />
        </Link>
      </div>
      <div>
        <FontAwesomeIcon className="header-icon" icon={faCartShopping} />
        <FontAwesomeIcon className="header-icon" icon={faUser} />
      </div>
    </div>
  );
}

export default Header;
