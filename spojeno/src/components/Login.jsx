import React, { useEffect } from "react";
import "./Login.css";
import user_icon from "../assets/user.png";
import password_icon from "../assets/lozinka.png";
import google_icon from "../assets/google.png";
import { jwtDecode } from "jwt-decode";

function Login(props) {
  const [loginForm, setLoginForm] = React.useState({
    username: "",
    password: "",
  });
  const [error, setError] = React.useState("");

  function isValid() {
    const { username, password } = loginForm;
    return username.length > 0 && password.length > 0;
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      fetch("/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(jwtDecode(data.token));
          if (data.token) {
            localStorage.setItem("token", data.token);
            props.onLogin();
          } else {
            setError("OAuth2 login failed");
          }
        })
        .catch((err) => {
          console.error("Error during OAuth2 token exchange:", err);
          setError("OAuth2 login failed");
        });
    }
  }, []);

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
              type="password"
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
      <div className="zadnje">
        <p>ili</p>
        <div className="google">
          <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20profile%20email&access_type=offline&response_type=code&redirect_uri=http://localhost:3000&client_id=418123801091-j7m2506kqlf26kfvh1teq9doe7pu5us1.apps.googleusercontent.com&include_granted_scopes=true">
            Prijava s Google računom
          </a>
          <img src={google_icon} alt="" />
        </div>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;
