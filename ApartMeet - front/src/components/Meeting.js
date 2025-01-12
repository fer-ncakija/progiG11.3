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
        {meetings.map((meeting, index) => (
          <div key={index} className="meeting-item">
            <h2>{meeting.naslov}</h2>
            <p>- {meeting.sazetak}</p>
            <p>- {meeting.vrijeme}</p>
            <p>- {meeting.mjesto}</p>
            <p>- Status: {meeting.stanje}</p>
            {role === "predstavnik" && meeting.stanje === "Planiran" && (
              <button
                className="dodaj"
                onClick={() => navigate(`/dodajTocke/${index}`)}
              >
                Dodaj točke dnevnog reda
              </button>
            )}
            {role === "predstavnik" && meeting.stanje === "Planiran" && (
              <button
                className="sudjeluj"
                onClick={() => navigate(`/sudjeluj/${index}`)}
              >
                Sudjeluj u sastanku
              </button>
            )}
            {role === "predstavnik" && meeting.stanje === "Planiran" && (
              <button
                className="obavljen"
                onClick={() => navigate(`/obavljen/${index}`)}
              >
                Označi sastanak kao obavljen
              </button>
            )}
            <p>______________________________________________________________________________________________________________</p>
          </div>
        ))}
      </div>
      {role === "predstavnik" && (
        <button className="kreiraj" onClick={() => navigate("/kreirajSastanak")}>
          Kreiraj Sastanak
        </button>
      )}
    </div>
  );
}
