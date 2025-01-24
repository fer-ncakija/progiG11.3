import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login.jsx";
import Header from './components/Header';
import Meeting from './components/Meeting';
import DodajClana from './components/DodajClana';
import KreirajSastanak from './components/KreirajSastanak.js';
import DodajTocke from './components/DodajTocke.js';
import Sudjeluj from './components/Sudjeluj.js';
import Obavljen from './components/Obavljen.js';
import PromijeniLozinku from './components/PromijeniLozinku.js';
import ObrisiClana from './components/ObrisiClana.js';
import DodajZakljucke from "./components/DodajZakljucke.js";
import NemaStranice from "./components/NemaStranice.js"
import './App.css';
import './components/Header.css';
import './Main.css';
import { jwtDecode } from "jwt-decode";

function App() {
  // stanje za praćenje prijavljenosti korisnika
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [userName, setUserName] = React.useState(null);
  const [role, setRole] = React.useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;
  
  // funkcija koja se poziva kada se korisnik uspješno prijavi
  function onLogin() {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.username);
      setRole(decodedToken.customRole);
    }
  }

  // funkcija koja se poziva kada se korisnik odjavi
  function onLogout() {
    setIsLoggedIn(false);
    setUserName(null);
    setRole(null);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");
  }

  function forceLogout()
  {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.username);
      setRole(decodedToken.customRole);

      fetch(`${apiUrl}/users`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.some((user) => user.username === decodedToken.username)) {
            onLogout();
          }
        })
        .catch(() => {
          onLogout();
        });
    } catch (error) {
      onLogout();
    }
  }

  useEffect(() => {
    forceLogout();
  }, [apiUrl]);

  // provjera je li korisnik prijavljen, ako nije prikazuje komponentu za prijavu
  if (!isLoggedIn) {
    return (
      <div className="App">
        <Login onLogin={onLogin} apiUrl={apiUrl} />
      </div>
    );
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header userName={userName} role={role} onLogout={onLogout}/>
        <Routes>
          <Route path="/" exact Component={({...props}) => <Meeting role={role} apiUrl={apiUrl} userName={userName} forceLogout={forceLogout} {...props}/>} />
          {role === "admin" && (
          <>
            <Route path="/dodajClana" exact Component={({...props}) => <DodajClana apiUrl={apiUrl} forceLogout={forceLogout} {...props}/>} />
            <Route path="/obrisiClana" exact Component={({...props}) => <ObrisiClana apiUrl={apiUrl} forceLogout={forceLogout} {...props}/>} />
          </>
          )}
          {role === "predstavnik" && (
          <>
            <Route path="/kreirajSastanak" exact Component={({...props}) => <KreirajSastanak apiUrl={apiUrl} forceLogout={forceLogout} {...props}/>} />
            <Route path="/dodajTocke/:id" exact Component={({...props}) => <DodajTocke apiUrl={apiUrl} forceLogout={forceLogout} {...props}/>} />
            <Route path="/obavljen/:id" exact Component={({...props}) => <Obavljen apiUrl={apiUrl} forceLogout={forceLogout} {...props}/>} />
            <Route path="/dodajZakljucke/:id" exact Component={({...props}) => <DodajZakljucke apiUrl={apiUrl} forceLogout={forceLogout} {...props}/>} />
          </>
          )}
          {role === "stanar" && (
          <>
            <Route path="/sudjeluj/:id" exact Component={({ ...props }) => <Sudjeluj userName={userName} apiUrl={apiUrl} forceLogout={forceLogout} {...props} />} />
          </>
          )}
          {(role === "stanar" || role === "predstavnik") && (
          <>
            <Route path="/promijeniLozinku" exact Component={({...props}) => <PromijeniLozinku apiUrl={apiUrl} userName={userName} forceLogout={forceLogout} {...props}/>} />
          </>
          )}
          <Route path="*" Component={NemaStranice} forceLogout={forceLogout}/>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
