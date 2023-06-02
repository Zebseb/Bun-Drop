import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function WelcomeDisplay() {
  const [user, setUser] = useState();

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    const jsonUser = localStorage.getItem("signedIn");

    if (jsonUser) {
      const user = JSON.parse(jsonUser);
      setUser(user);
    } else {
      return [];
    }
  }

  return (
    <div>
      <div className="flex-div">
        <div className="menu-text">
          {user ? (
            <h2>
              <span className="italic-text">Hey there</span>, {user.user}!
            </h2>
          ) : (
            <h2>
              <span className="italic-text">Hey there</span>, dear guest!
            </h2>
          )}
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
