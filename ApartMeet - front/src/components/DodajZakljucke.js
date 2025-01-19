import React from "react";
import "./DodajZakljucke.css";
import { useNavigate, useParams } from 'react-router-dom';


function DodajZakljucke({ apiUrl }) {

    return (
        <div className="meetbox">
            <h1>Dodaj zaključke</h1>
            <form>
                <p>Zaključak:</p>
                <textarea id="zakljucak" name="zakljucak" rows="10" cols="50"></textarea>
                <button type="submit">Dodaj zaključak</button>
            </form>
        </div>
    );
}

export default DodajZakljucke;