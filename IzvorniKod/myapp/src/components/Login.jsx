import React from "react";
import "./Login.css";
import user_icon from "../assets/user.png";
import password_icon from "../assets/lozinka.png";
import google_icon from "../assets/google.png";

const Login = () => {
  return (
    <form>
      <div className="box">
        <div className="gore">
          <div className="tekst">Prijavi se</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="email" placeholder="Korisnik" />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Lozinka" />
          </div>
        </div>
        <div className="zaborav">Zaboravljena lozinka?</div>
        <div className="submit">
          <div className="prijava">Prijava</div>
          <p>ili</p>
          <div className="google">
            <p>Prijava s Google računom</p>
            <img src={google_icon} alt="" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
