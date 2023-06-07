import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div>
      <div className="flex-container footer-container">
        <ul className="footer-icons">
          <a href="https://www.instagram.com/" target="_blank">
            <li className="margin-left icon-medium">
              <FontAwesomeIcon icon={faInstagram} />
            </li>
          </a>
          <a href="https://twitter.com/" target="_blank">
            <li className="margin-left icon-medium">
              <FontAwesomeIcon icon={faTwitter} />
            </li>
          </a>
          <a href="https://sv-se.facebook.com/" target="_blank">
            <li className="margin-left icon-medium">
              <FontAwesomeIcon icon={faFacebook} />
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
