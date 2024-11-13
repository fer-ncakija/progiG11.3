import * as React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login.jsx";
import Header from './components/Header';
import Meeting from './components/Meeting';
import DodajClana from './components/DodajClana';
import './App.css'
import './components/Header.css';
import './Main.css';
import { jwtDecode } from "jwt-decode";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  
  // Funkcija koja se poziva kada se korisnik uspješno prijavi
  function onLogin() {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // Spremanje statusa prijave u localStorage
  }

  if (!isLoggedIn) {
    return (
      <div className="App">
        <Login onLogin={onLogin}/>
      </div>
    )
  }

  //izvlacenje podataka o korisniku iz tokena
  const userName = jwtDecode(localStorage.getItem("token")).username
  const role = jwtDecode(localStorage.getItem("token")).customRole

  return (
    <div className="App">
      <BrowserRouter>
      <Header userName={userName} role={role}/>
        <Routes>
          <Route path="/" exact Component={Meeting}/>
          <Route path="/dodajClana" exact Component={DodajClana}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
 