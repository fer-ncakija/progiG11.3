import React from "react";
import "./Obavljen.css";
import { useNavigate, useParams } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

function Obavljen() {
    const navigate = useNavigate();
    const { id } = useParams(); // dohvaćanje ID-a sastanka iz URL-a

    // funkcija za obradu slanja forme
    function onSubmit(e) {
        e.preventDefault();

        const data = {
            stanje: "Obavljen" // postavljanje stanja sastanka na "Objavljen"
        };

        const options = {
            method: "PUT", // promjena iz POST u PUT zbog ažuriranja postojećeg sastanka
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/meetings/${id}`, options) // slanje zahtjeva s ID-em sastanka
            .then(() => {
                navigate('/');
            });
    }

    return (
        <div className="donebox">
            <form onSubmit={onSubmit}>
                <div className="doneask">
                    <p>Želite li označiti sastanak kao obavljen?</p>
                </div>
                <div className="submitdone">
                    <button className="donebutton" type="submit">Da</button>
                    <button className="buttonnot" type="button" onClick={() => navigate('/')}>Ne</button>
                </div>
            </form>
        </div>
    );
}

export default Obavljen;
