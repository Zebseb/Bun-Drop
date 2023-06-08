import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [user, setUser] = useState({
    name: "",
    password: "",
    orders: [],
    favourites: [],
  });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [logInSelected, setFormChoice] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [logInSelected]);

  async function getUsers() {
    await fetch("http://localhost:7001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }

  function handleFormInput(e) {
    e.preventDefault();
    let errorMessage = document.querySelector(".checkout-error");
    errorMessage.classList.remove("green-text");

    if (logInSelected) {
      const foundUser = users.find(
        (u) => u.name === user.name && u.password === user.password
      );

      if (foundUser) {
        localStorage.setItem(
          "signedIn",
          JSON.stringify({
            isSignedin: true,
            user: user.name,
            dbId: foundUser.id,
          })
        );
        setMessage(`Welcome ${user.name}!`);
        navigate("/");
        location.reload();
      } else {
        setMessage("Username or password is incorrect...");
      }
    } else {
      const isTakenUsername = users.find((u) => u.name === user.name);

      if (!isTakenUsername) {
        if (user.name.length >= 3 && user.password.length >= 5) {
          fetch("http://localhost:7001/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });

          setUser({
            name: "",
            password: "",
            orders: [],
            favourites: [],
          });
          setMessage(
            "Thanks for signing up to Bun Drop! Please log in with your credentials."
          );
          errorMessage = document.querySelector("#error-msg");
          errorMessage.classList.add("green-text");

          setFormChoice(true);
          getUsers();
        } else {
          setMessage(
            "Your username have to contain at least 3 characters and the password at least 5 characters."
          );
        }
      } else {
        setMessage(
          "The username is already taken... Please choose another one!"
        );
      }
    }
  }

  function handleUsername(e) {
    setUser({ ...user, name: e.target.value });
  }

  function handlePassword(e) {
    setUser({ ...user, password: e.target.value });
  }

  function handleFormChoice() {
    setMessage("");
    setUser({ ...user, name: "", password: "" });

    if (logInSelected) {
      setFormChoice(false);
    } else {
      setFormChoice(true);
    }
  }

  if (logInSelected) {
    return (
      <div className="opacity-div-login flex-body">
        <div className="flex-div">
          <h2 className="underline">Log In</h2>
          <h2 onClick={handleFormChoice}>Sign Up</h2>
        </div>
        <p className="checkout-error">{message}</p>
        <form onSubmit={handleFormInput}>
          <div>
            <label htmlFor="name-input">Username</label>
            <input
              className="login-bar"
              id="name-input"
              type="text"
              onChange={handleUsername}
              value={user.name}
            />
          </div>
          <div>
            <label className="password-label" htmlFor="password-input">
              Password
            </label>
            <input
              className="login-bar"
              id="password-input"
              type="password"
              onChange={handlePassword}
              value={user.password}
            />
          </div>
          <button className="login-btn" type="submit">
            Enter
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="opacity-div-login flex-body">
        <div className="flex-div">
          <h2 onClick={handleFormChoice}>Log In</h2>
          <h2 className="underline">Sign Up</h2>
        </div>
        <p id="error-msg" className="checkout-error">
          {message}
        </p>
        <form onSubmit={handleFormInput}>
          <div>
            <label htmlFor="name-input">Username</label>
            <input
              className="login-bar"
              id="name-input"
              type="text"
              onChange={handleUsername}
              value={user.name}
            />
          </div>
          <div>
            <label className="password-label" htmlFor="password-input">
              Password
            </label>
            <input
              className="login-bar"
              id="password-input"
              type="password"
              onChange={handlePassword}
              value={user.password}
            />
          </div>
          <button className="login-btn" type="submit">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
