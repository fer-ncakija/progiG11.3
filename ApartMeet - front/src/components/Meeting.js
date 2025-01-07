import React from "react";
import { useNavigate } from "react-router-dom";
import "./Meeting.css";

export default function Meeting({ role }) {
  const navigate = useNavigate();

  return (
    <div className="meeting-container">
      <h1>Tu idu meetingsi :D</h1>
      {role === "predstavnik" && (
        <button className="gumb-sastanak" onClick={() => navigate("/dodajSastanak")}>
          Dodaj Sastanak
        </button>
      )}
    </div>
  );
}
