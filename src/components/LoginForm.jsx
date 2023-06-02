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
  }, []);

  async function getUsers() {
    await fetch("http://localhost:7001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }

  function handleFormInput(e) {
    e.preventDefault();
    if (logInSelected) {
      const foundUser = users.find(
        (u) => u.name === user.name && u.password === user.password
      );

      if (foundUser) {
        localStorage.setItem(
          "signedIn",
          JSON.stringify({ isSignedin: true, user: user.name })
        );
        setMessage(`Welcome ${user.name}!`);
        navigate("/");
        location.reload(); // Reload all components
      } else {
        setMessage("Username or password is incorrect...");
      }
    } else {
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
        setMessage("Thanks for signing up to Bun Drop!");
      } else {
        setMessage(
          "Your username have to contain at least 3 characters and the password at least 5 characters."
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
    if (logInSelected) {
      setFormChoice(false);
    } else {
      setFormChoice(true);
    }
  }

  if (logInSelected) {
    return (
      <div>
        <div className="flex-div">
          <h2 className="underline">Log In</h2>
          <h2 onClick={handleFormChoice}>Sign Up</h2>
        </div>
        <div>{message}</div>
        <form onSubmit={handleFormInput}>
          <label htmlFor="name-input">Username</label>
          <input
            id="name-input"
            type="text"
            onChange={handleUsername}
            value={user.name}
          />
          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            type="password"
            onChange={handlePassword}
            value={user.password}
          />
          <button className="complete-btn" type="submit">
            Enter
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex-div">
          <h2 onClick={handleFormChoice}>Log In</h2>
          <h2 className="underline">Sign Up</h2>
        </div>
        {message}
        <form onSubmit={handleFormInput}>
          <label htmlFor="name-input">Username</label>
          <input
            id="name-input"
            type="text"
            onChange={handleUsername}
            value={user.name}
          />
          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            type="password"
            onChange={handlePassword}
            value={user.password}
          />
          <button className="complete-btn" type="submit">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
