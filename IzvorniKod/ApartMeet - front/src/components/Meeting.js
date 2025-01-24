import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Meeting.css";


export default function Meeting({ role, apiUrl, userName }) {

  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [currentUser, setCurrentUser] = useState(userName);


  // dohvaćanje podataka iz backendas
  useEffect(() => {
    fetch(`${apiUrl}/meetings`)
      .then(response => response.json())
      .then(data => setMeetings(data));
  }, [])
  

  return (
    <div className="meeting-container">

      {role === "admin" && (
        <p>Admin nema pristup uvidima u sastanke</p>
      )}
      
      {role != "admin" && (
        <div className="meeting-list">

          {meetings
            .filter((meeting) => {
              return !(role === "stanar" && meeting.stanje === "Planiran");
            })
            .map((meeting, index) => {
              index += 1;
              const datum = new Date(meeting.vrijeme); 
              const satiMinute = datum.toLocaleTimeString("hr-HR", {
                hour: "2-digit",
                minute: "2-digit",
              }); 
              const datumDio = datum.toLocaleDateString("hr-HR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });


          const isUserInMeeting = meeting.sudionici?.some((user) => user.username === currentUser);


          return (
            
            <div key={index} className="meeting-item">

              <h2 className="meeting-title">{meeting.naslov}</h2>
              <div className="meeting-bullets">
                <p className="meeting-status">Status: {meeting.stanje}</p>
                <p className="meeting-intro">- {meeting.sazetak}</p>
                <p className="meeting-time">- {datumDio} ({datum.toLocaleDateString("hr-HR", { weekday: "long" })}) u {satiMinute} sati{meeting.mjesto === "" ? "": `, ${meeting.mjesto}`}</p>
              </div>
              

              <div className="agenda-points">
                <h3>Točke dnevnog reda:</h3>
                <ul>
                  {meeting.stanje !== "Planiran" &&
                    meeting.tockeDnevnogReda.map((tocka, tockaIndex) => (
                      <li key={tockaIndex}>
                        <strong>{tocka.naziv}</strong> - Pravna učinkovitost:{" "}
                        {tocka.pravniUcinak ? "DA" : "NE"} {tocka.zakljucak && meeting.stanje === "Arhiviran" && (
                          <>- <strong>Zaključak:</strong> {tocka.zakljucak}</>
                        )}
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

              {new Date(meeting.vrijeme).getTime() > new Date().getTime() && meeting.stanje === "Objavljen" && !isUserInMeeting && role === "stanar" && (
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
              
              {role === "predstavnik" && meeting.stanje === "Obavljen" && (
                <button
                  className="zakljucci"
                  onClick={() => navigate(`/dodajZakljucke/${index}`)}
                  > 
                    Dodaj zaključke
                </button>)
              }
              

              </div>
              
            </div>
          );
        })}

      </div>
      )
      }
      
      {role === "predstavnik" && (
        <button className="kreiraj" onClick={() => navigate("/kreirajSastanak")}>
          Kreiraj Sastanak
        </button>
      )}
    </div>
  );
}
