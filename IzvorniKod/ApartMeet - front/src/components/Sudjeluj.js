import React from "react";
import { useEffect } from "react";
import "./Sudjeluj.css";
import { useNavigate, useParams } from 'react-router-dom';

function Sudjeluj({ userName, apiUrl }) {
    const currentUser = userName;
    const navigate = useNavigate();
    const { id } = useParams(); // dohvaćanje ID-a sastanka iz URL-a

    const [attendForm, setAttendForm] = React.useState({
        sudionik: "",
    });

    useEffect(() => {
        fetch(`${apiUrl}/meetings/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if ((data.sudionici.some((user) => user.username === currentUser)) || (data.stanje != "Objavljen") || (new Date(data.vrijeme).getTime() > new Date().getTime())) {
                    navigate('*');
                }
            })
    }, [apiUrl, id, navigate]);

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

        fetch(`${apiUrl}/meetings/${id}/users/${userName}`, options)
            .then(() => {
                navigate('/');
            });
    }

    return (
        <div className="attendbox">
            <form onSubmit={onSubmit}>
                <div className="attendask">
                    <p>Sudjelujete li na sastanku?</p>
                </div>
                <div className="submitattend">
                    <button className="attendbutton" type="submit" onClick={() => onChange({ target: { name: "sudionik", value: userName } })}>Da</button>
                    <button className="nobutton" type="button" onClick={() => navigate('/')}>Ne</button>
                </div>
            </form>
        </div>
    );
}

export default Sudjeluj;


