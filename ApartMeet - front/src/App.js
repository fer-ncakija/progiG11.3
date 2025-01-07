import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Header from './components/Header';
import Meeting from './components/Meeting';
import DodajClana from './components/DodajClana';
import DodajSastanak from './components/DodajSastanak';
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
          <Route path="/dodajSastanak" exact Component={DodajSastanak} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
