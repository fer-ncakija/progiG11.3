import React from "react";
import "./Sudjeluj.css";
import { useNavigate, useParams } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

function Sudjeluj({ userName }) {
    const navigate = useNavigate();
    const { id } = useParams(); // dohvaćanje ID-a sastanka iz URL-a

    const [attendForm, setAttendForm] = React.useState({
        sudionik: "",
    });

    // funkcija za obradu promjene stanja
    function onChange(event) {
        const { name, value } = event.target;
        setAttendForm((oldForm) => ({ ...oldForm, [name]: value }));
    }

    // funkcija za obradu slanja forme
    function onSubmit(e) {
        e.preventDefault();

        const data = {
            sudionik: attendForm.sudionik,
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/meetings/${id}/users`, options) // !!!! PROVJERITE JESAM DOBRO STAVILA, NISAM SIGURNA KAK SE ZOVE NA BACKU !!!!
            .then(response => response.json())
            .then(() => {
                navigate('/');
            });
    }

    return (
        <div className="attendbox">
            <form onSubmit={onSubmit}>
                <div className="attendinputs">
                    <p>Sudjelujete li na sastanku?</p>
                </div>
                <div className="submitattend">
                    <button className="attendbutton" type="submit" onClick={() => onChange({ target: { name: "sudionik", value: userName } })}>Da</button>
                </div>
                <div className="addattend">
                    <button className="addbutton" type="button" onClick={() => navigate('/')}>Ne</button>
                </div>
            </form>
        </div>
    );
}

export default Sudjeluj;


