import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Meeting.css";
import laznabazasastanaka from "./laznabazasastanaka.json"; // učitavanje privremene baze sastanaka

const apiUrl = process.env.REACT_APP_API_URL;


export default function Meeting({ role }) {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);

  /*
  // dohvaćanje podataka iz backenda --> treba provjeriti je li dobro !!!
  useEffect(() => {
    fetch(`${apiUrl}/meetings`)
      .then(response => response.json())
      .then(data => setMeetings(data));
  }, []);
  */

  // simuliran dohvat podataka iz privremene baze --> privremeno, zamijeniti s gornjim useEffect-om pri spajanju na backend !!!
  useEffect(() => {
    setMeetings(laznabazasastanaka.sastanci);
  }, []);
  

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

              {role === "predstavnik" && meeting.stanje === "Objavljen" && (
                <button
                  className="sudjeluj"
                  onClick={() => navigate(`/sudjeluj/${index}`)}
                >
                  Sudjeluj u sastanku
                </button>
              )}

              {/* Gumb za označavanje kao obavljen */}
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
                className="detalji"
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
