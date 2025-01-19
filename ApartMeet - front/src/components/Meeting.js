import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Meeting.css";
<<<<<<< HEAD
import laznabazasastanaka from "./laznabazasastanaka.json"; // učitavanje privremene baze sastanaka
import jwtDecode  from "jwt-decode";


const apiUrl = process.env.REACT_APP_API_URL;
=======
//import laznabazasastanaka from "./laznabazasastanaka.json"; // učitavanje privremene baze sastanaka (maknut komentar kada se koristi privremena baza sastanaka samo za testiranje frontenda !!!)
>>>>>>> b34bda9aba6104ed9b0dacf0577da91bf0b21cf9


export default function Meeting({ role, apiUrl }) {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [currentUser, setCurrentUser] = useState("frontUser");
  

 /* useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUser(decodedToken.username || decodedToken.id); 
    }
  }, []);*/


  // dohvaćanje podataka iz backenda --> treba zakomentirati kada se koristi privremena baza sastanaka samo za testiranje frontenda !!!
  useEffect(() => {
    fetch(`${apiUrl}/meetings`)
      .then(response => response.json())
      .then(data => setMeetings(data));
  }, []);

  
  /*
  // simuliran dohvat podataka iz privremene baze --> maknut komentar kada se koristi privremena baza sastanaka samo za testiranje frontenda !!!
  useEffect(() => {
    setMeetings(laznabazasastanaka.sastanci);
  }, []);
  */
  

  return (
    <div className="meeting-container">
      
      <div className="meeting-list">
        {meetings.map((meeting, index) => {
          index += 1;
          const datum = new Date(meeting.vrijeme); // Pretvori string u Date objekt
          const satiMinute = datum.toLocaleTimeString("hr-HR", {
            hour: "2-digit",
            minute: "2-digit",
          }); // Dobij vrijeme u formatu 13:00
          const datumDio = datum.toLocaleDateString("hr-HR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          const isUserInMeeting = meeting.sudionik?.some((user) => user.userName === currentUser);


          return (
            <div key={index} className="meeting-item">

              <h2 className="meeting-title">{meeting.naslov}</h2>
              <div className="meeting-bullets">
                <p className="meeting-status">Status: {meeting.stanje}</p>
                <p className="meeting-intro">- {meeting.sazetak}</p>
                <p className="meeting-time">- {datumDio} ({datum.toLocaleDateString("hr-HR", { weekday: "long" })}) u {satiMinute} sati, {meeting.mjesto}</p>
              </div>
              

              <div className="agenda-points">
                <h3>Točke dnevnog reda:</h3>
                <ul>
                  {meeting.stanje !== "Planiran" &&
                    meeting.tockeDnevnogReda.map((tocka, tockaIndex) => (
                      <li key={tockaIndex}>
                        <strong>{tocka.naziv}</strong> - Pravna učinkovitost:{" "}
                        {tocka.pravniUcinak ? "DA" : "NE"}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="buttons">
                    
              {role === "predstavnik" && meeting.stanje === "Planiran" && (
                <button
                  className="dodaj"
                  onClick={() => navigate(`/dodajTocke/${index}`)}
                >
                  Dodaj točke dnevnog reda
                </button>
              )}

              {role === "predstavnik" && new Date(meeting.vrijeme).getTime() > new Date().getTime() && meeting.stanje === "Objavljen" && !isUserInMeeting && (
                <button
                  className="sudjeluj"
                  onClick={() => navigate(`/sudjeluj/${index}`)}
                >
                  Sudjeluj u sastanku
                </button>
              )}
              {role === "predstavnik" &&
                meeting.stanje === "Objavljen" &&
                new Date(meeting.vrijeme).getTime() < new Date().getTime() && (
                  <button
                    className="obavljen"
                    onClick={() => navigate(`/obavljen/${index}`)}
                  >
                    Označi sastanak kao obavljen
                  </button>
                )}
              
              <button
                className="zakljucci"
                onClick={() => navigate(`/dodajZakljucke/${index}`)}
              > Dodaj zaključke
              </button>

              </div>
              
            </div>
          );
        })}

      </div>
      {role === "predstavnik" && (
        <button className="kreiraj" onClick={() => navigate("/kreirajSastanak")}>
          Kreiraj Sastanak
        </button>
      )}
    </div>
  );
}
