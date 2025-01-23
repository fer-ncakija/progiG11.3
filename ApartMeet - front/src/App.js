import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  
  // funkcija koja se poziva kada se korisnik uspješno prijavi
  function onLogin() {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  }

  // funkcija koja se poziva kada se korisnik odjavi
  function onLogout() {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");
  }


  const apiUrl = process.env.REACT_APP_API_URL;


  // provjera je li korisnik prijavljen, ako nije prikazuje komponentu za prijavu
  if (!isLoggedIn) {
    return (
      <div className="App">
        <Login onLogin={onLogin} apiUrl={apiUrl} />
      </div>
    );
  }


  // OVO TREBA ZAKOMENTIRATI KAD ĆE SE KORISTITI SAMO FRONTEND BEZ BACKENDA !!!!
  // dekodiranje JWT tokena kako bi se dobili korisničko ime i ulogu
  //const userName = jwtDecode(localStorage.getItem("token")).username;
  //const role = jwtDecode(localStorage.getItem("token")).customRole;


  
  // TREBA MAKNUTI KOMETAR KAD SE KORISTI SAMO FRONTEND BEZ BACKENDA !!!!
  const userName = "frontuser";
  const role = "stanar";
  


  return (
    <div className="App">
      <BrowserRouter>
        <Header userName={userName} role={role} onLogout={onLogout}/>
        <Routes>
          <Route path="/" exact Component={({...props}) => <Meeting role={role} apiUrl={apiUrl} userName={userName} {...props}/>} />
          {role === "admin" && (
          <>
            <Route path="/dodajClana" exact Component={({...props}) => <DodajClana apiUrl={apiUrl} {...props}/>} />
            <Route path="/obrisiClana" exact Component={({...props}) => <ObrisiClana apiUrl={apiUrl} {...props}/>} />
          </>
          )}
          {role === "predstavnik" && (
          <>
            <Route path="/kreirajSastanak" exact Component={({...props}) => <KreirajSastanak apiUrl={apiUrl} {...props}/>} />
            <Route path="/dodajTocke/:id" exact Component={({...props}) => <DodajTocke apiUrl={apiUrl} {...props}/>} />
            <Route path="/obavljen/:id" exact Component={({...props}) => <Obavljen apiUrl={apiUrl} {...props}/>} />
            <Route path="/dodajZakljucke/:id" exact Component={({...props}) => <DodajZakljucke apiUrl={apiUrl} {...props}/>} />
          </>
          )}
          {role === "stanar" && (
          <>
            <Route path="/sudjeluj/:id" exact Component={({ ...props }) => <Sudjeluj userName={userName} apiUrl={apiUrl} {...props} />} />
          </>
          )}
          {(role === "stanar" || role === "predstavnik") && (
          <>
            <Route path="/promijeniLozinku" exact Component={({...props}) => <PromijeniLozinku apiUrl={apiUrl} userName={userName} {...props}/>} />
          </>
          )}
          <Route path="*" Component={NemaStranice}/>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
