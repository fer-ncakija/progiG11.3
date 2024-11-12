import * as React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login.jsx";
import Header from './components/Header';
import Meeting from './components/Meeting';
import DodajClana from './components/DodajClana';
import './App.css'
import './components/Header.css';
import './Main.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  function onLogin() {
    setIsLoggedIn(true)
  }


  if (!isLoggedIn) {
    return (
      <div className="App">
        <Login onLogin={onLogin}/>
      </div>
    )
  }

  let userName
  let role

  return (
    <div className="App">
      <BrowserRouter>
      <Header userName="emaBradic" role="administrator"/>
        <Routes>
          <Route path="/" exact Component={Meeting}/>
          <Route path="/dodavanjeClana" exact Component={DodajClana}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
 