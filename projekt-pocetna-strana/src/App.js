import './Header.css';
import './Main.css';
import Header from './Header';
import Meeting from './Meeting';
import DodajClana from './DodajClana';
import './App.css'

//trenutni podaci oko userra se preko propsa prebacuju
//treba povezati sa loginom da od njega povuce te podatke

//i treba se napraviti da nakon sto se klikne na dodajclana u dropdown umjestp Meeting rendera DodajClana
function App() {
  return (
    <div className="App">
      <Header  userName="emaBradic" administrator={true} predstavnik={false} stanar={false}/>
      <div className="meeting-container">
        <Meeting/>
      </div>
    </div>
  );
}

export default App;
 