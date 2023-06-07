import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [signedInUser, setSignedInUser] = useState({});
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSignedInUser();
    getUsers();
  }, []);

  useEffect(() => {
    getUser();
  }, [signedInUser, users]);

  function getSignedInUser() {
    const jsonUser = localStorage.getItem("signedIn");

    if (jsonUser) {
      const user = JSON.parse(jsonUser);
      setSignedInUser(user);
    } else {
      return [];
    }
  }

  async function getUsers() {
    await fetch("http://localhost:7001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }

  function getUser() {
    const foundUser = users.find((u) => u.name === signedInUser.user);
    console.log(foundUser);
    setUser(foundUser);
  }

  function handleLogOut() {
    localStorage.removeItem("signedIn");
    localStorage.removeItem("cartItem");
    navigate("/");
    location.reload();
  }

  if (user) {
    return (
      <div>
        <div className="center-div opacity-div-login">
          <div className="profile-flex-row">
            <FontAwesomeIcon
              className="margin-right icon-large"
              icon={faPerson}
            />
            <h3>{user.name}</h3>
          </div>
          <div className="flex-div margin-top">
            <FontAwesomeIcon
              className="margin-right icon-medium"
              icon={faStar}
            />
            <div className="flex-column">
              {user.favourites.map((f) => (
                <div className="favourites-list-item" key={f.id}>
                  <ul className="profile-list">
                    <li className="bright-text">{f.name}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-div margin-top margin-bottom">
            <FontAwesomeIcon
              className="margin-right icon-medium"
              icon={faReceipt}
            />
            <div className="flex-column">
              {user.orders.map((o) => (
                <div className="favourites-list-item" key={o.date}>
                  <ul className="profile-list">
                    <li className="bright-text">
                      {o.date} | {o.payment}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="center-div">
          <button
            id="log-out-btn"
            className="menu-button"
            onClick={handleLogOut}
          >
            Log out
          </button>
        </div>
      </div>
    );
  } else {
    <div>
      <h4>Loading...</h4>
    </div>;
  }
}

export default Profile;
