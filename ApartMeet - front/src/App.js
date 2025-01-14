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

  // provjera je li korisnik prijavljen, ako nije prikazuje komponentu za prijavu
  if (!isLoggedIn) {
    return (
      <div className="App">
        <Login onLogin={onLogin} />
      </div>
    );
  }

  
  // OVO PRIVREMENO ZAKOMENTIRANO ZA POTREBE FRONTENDA (DA NE TREBA BACKEND)!!!!

  /*
  // dekodiranje JWT tokena kako bi se dobili korisničko ime i ulogu
  const userName = jwtDecode(localStorage.getItem("token")).username;
  const role = jwtDecode(localStorage.getItem("token")).customRole;
  */



  // OVO PRIVREMENO, TREBA SE OBRISAT KAD ĆE SE SPAJAT SA BACKENDOM!!!!!
  const userName = "frontuser";
  const role = "predstavnik";

  
  return (
    <div className="App">
      <BrowserRouter>
        <Header userName={userName} role={role} />
        <Routes>
          <Route path="/" exact Component={({...props}) => <Meeting role={role} {...props}/>} />
          <Route path="/dodajClana" exact Component={DodajClana} />
          <Route path="/kreirajSastanak" exact Component={KreirajSastanak} />
          <Route path="/dodajTocke/:id" exact Component={DodajTocke} />
          <Route path="/sudjeluj/:id" exact Component={({ ...props }) => <Sudjeluj userName={userName} {...props} />} />
          <Route path="/obavljen/:id" exact Component={Obavljen} />
          <Route path="/promijeniLozinku" exact Component={PromijeniLozinku} />
          <Route path="/obrisiClana" exact Component={ObrisiClana} />
          <Route path="/dodajZakljucke/:id" exact Component={DodajZakljucke} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
