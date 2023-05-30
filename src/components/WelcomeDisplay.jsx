import React from "react";
import { Link } from "react-router-dom";

function WelcomeDisplay() {
  return (
    <div>
      {" "}
      <div className="flex-div">
        <div className="menu-text">
          <h2>
            <span className="italic-text">Hey there</span>, Zeb!
          </h2>
          <p>
            We at Bun Drop have been droppin'
            <br /> burgers as fire as Snoop Dogg's bars,
            <br /> since early 2018.
          </p>
        </div>
      </div>
      <div className="button-div">
        <Link to="/menu">
          <button className="menu-button">See our menu!</button>
        </Link>
      </div>
    </div>
  );
}

export default WelcomeDisplay;
