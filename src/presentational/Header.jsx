import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  function checkUser() {
    const loggedIn = localStorage.getItem("signedIn");
    if (loggedIn != null) {
      setIsLoggedIn(true);
    }
  }

  function toggleMenu() {
    setNavbar(!navbar);
  }

  return (
    <div className="flex-container">
      <div className="sm-header-div">
        <FontAwesomeIcon
          className="menu-icon"
          icon={faBars}
          onClick={toggleMenu}
        />
        <div className={navbar ? "header-links expand-div" : "header-links"}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="xl-header-div">
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
          <FontAwesomeIcon
            className="cart-icon header-icon"
            icon={faCartShopping}
          />
        </Link>
        {isLoggedIn ? (
          <Link to="/profile">
            <FontAwesomeIcon className="user-icon header-icon" icon={faUser} />
          </Link>
        ) : (
          <Link to="/loginform">
            <FontAwesomeIcon className="user-icon header-icon" icon={faUser} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
