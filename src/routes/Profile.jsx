import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [signedInUser, setSignedInUser] = useState({});
  const [user, setUser] = useState({});
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
    setUser(foundUser);
  }

  function handleLogOut() {
    localStorage.removeItem("signedIn");
    navigate("/");
    location.reload();
  }

  if (user) {
    return (
      <div>
        <h3>Username: {user.name}</h3>
        <button onClick={handleLogOut}>Log out</button>
      </div>
    );
  } else {
    <div>
      <h4>Loading...</h4>
    </div>;
  }
}

export default Profile;
