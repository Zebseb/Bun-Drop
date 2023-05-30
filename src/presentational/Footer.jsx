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
      <div className="flex-container">
        <ul className="footer-icons">
          <li className="margin-left icon-medium">
            <FontAwesomeIcon icon={faInstagram} />
          </li>
          <li className="margin-left icon-medium">
            <FontAwesomeIcon icon={faTwitter} />
          </li>
          <li className="margin-left icon-medium">
            <FontAwesomeIcon icon={faFacebook} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
