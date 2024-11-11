import React from "react";
import "./Login.css";
import user_icon from "../assets/user.png";
import password_icon from "../assets/lozinka.png";
import google_icon from "../assets/google.png";

function Login(props) {
  const [loginForm, setLoginForm] = React.useState({
    username: "",
    password: "",
  });
  const [error, setError] = React.useState("");

  function isValid() {
    const { username, password } = loginForm;
    return username.length > 5 && password.length > 5;
  }

  function onChange(event) {
    const { name, value } = event.target;
    setLoginForm((oldForm) => ({ ...oldForm, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    const data = {
      username: loginForm.username,
      password: loginForm.password,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("/login", options).then((response) => {
      if (response.status === 401) {
        setError("Login failed");
      } else {
        props.onLogin();
      }
    });
  }
  return (
    <div className="box">
      <form onSubmit={onSubmit}>
        <div className="gore">
          <div className="tekst">Prijavi se</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              name="username"
              placeholder="Korisnik"
              onChange={onChange}
              value={loginForm.username}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              name="password"
              placeholder="Lozinka"
              onChange={onChange}
              value={loginForm.password}
            />
          </div>
        </div>
        <div className="zaborav">Zaboravljena lozinka?</div>
        <div className="submit">
          <button className="prijava" type="submit" disabled={!isValid()}>
            Prijava
          </button>
        </div>
      </form>
      <div className="nes">
        <p>ili</p>
        <div className="google">
          <a href="http://localhost:8080/oauth2/authorization/google">
            Prijava s Google računom
          </a>
          <img src={google_icon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
