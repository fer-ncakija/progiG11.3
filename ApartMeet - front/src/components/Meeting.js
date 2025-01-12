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
      .then(data => setMeetings(data.sastanci));
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
          // Debugging: Pratimo vrijednosti za vrijeme sastanka
          console.log("Vrijeme sastanka:", meeting.vrijeme);
          console.log("Parsed vrijeme sastanka:", new Date(meeting.vrijeme));
          console.log("Trenutno vrijeme:", new Date());
          console.log(
            "Je li vrijeme prošlo?",
            new Date(meeting.vrijeme).getTime() < new Date().getTime()
          );

          return (
            <div key={index} className="meeting-item">
              <h2>{meeting.naslov}</h2>
              <p>- {meeting.sazetak}</p>
              <p>- {meeting.vrijeme}</p>
              <p>- {meeting.mjesto}</p>
              <p>- Status: {meeting.stanje}</p>

              <div className="agenda-points">
                <h3>Točke dnevnog reda:</h3>
                <ul>
                  {meeting.stanje !== "Planiran" &&
                    meeting.tockeDnevnogReda.map((tocka, tockaIndex) => (
                      <li key={tockaIndex}>
                        <strong>{tocka.naziv}</strong> - Pravna učinkovitost:{" "}
                        {tocka.pravniUcinak ? "Da" : "Ne"}
                      </li>
                    ))}
                </ul>
              </div>

              {role === "predstavnik" && meeting.stanje === "Planiran" && (
                <button
                  className="dodaj"
                  onClick={() => navigate(`/dodajTocke/${index}`)}
                >
                  Dodaj točke dnevnog reda
                </button>
              )}

              {role === "stanar" && meeting.stanje === "Objavljen" && (
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

              <p>______________________________________________________________________________________________________________</p>
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
