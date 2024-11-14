import React, { useEffect } from "react";
import "./Login.css";
import user_icon from "../assets/user.png";
import password_icon from "../assets/lozinka.png";
import google_icon from "../assets/google.png";
import { jwtDecode } from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URL;

function Login(props) {
  // stanje za pohranu podataka unesenih u formu za prijavu (korisničko ime i lozinka)
  const [loginForm, setLoginForm] = React.useState({
    username: "",
    password: "",
  });

  // stanje za pohranu poruke o grešci prilikom prijave
  const [error, setError] = React.useState("");

  // provjera je li forma za prijavu ispravna
  function isValid() {
    const { username, password } = loginForm;
    return username.length > 0 && password.length > 0;
  }

  // ažurira podatke u formi na temelju korisnikovog unosa
  function onChange(event) {
    const { name, value } = event.target;
    setLoginForm((oldForm) => ({ ...oldForm, [name]: value }));
  }

  // funkcija za obradu slanja forme
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
    fetch(`${apiUrl}/login`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          props.onLogin();
        }
      })
      .catch((error) => {
        setError("Greška prilikom prijave");
      });
  }

  // hook za provjeru postoji li OAuth2 kod u URL-u i obradu prijave preko Google računa
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      fetch(`${apiUrl}/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem("token", data.token);
            props.onLogin();
          } else {
            setError("OAuth2 login nije uspio");
          }
        })
        .catch((err) => {
          setError("OAuth2 login nije uspio");
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
