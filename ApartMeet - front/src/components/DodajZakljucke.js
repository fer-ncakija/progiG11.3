import React, { useState, useEffect } from "react";
import "./DodajZakljucke.css";
import { useNavigate, useParams } from 'react-router-dom';

function DodajZakljucke({ apiUrl }) {
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [agendaForm, setAgendaForm] = React.useState([]);

    // provjerava imaju li točke s pravnim učinkom zaključke
    function isValid() {
        return agendaForm.every(tocka => 
            !tocka.pravniUcinak || (tocka.zakljucak && ['Izglasan', 'Odbijen'].includes(tocka.zakljucak))
        );
    }

    useEffect(() => {
        fetch(`${apiUrl}/meetings/${id}/agendapoints`)
            .then(response => response.json())
            .then(data => setAgendaForm(data));
    }, [apiUrl, id]);


    // ažurira podatke u formi na temelju korisnikovog unosa
    function onChange(event) {
        const { name, value, dataset } = event.target;
        const updatedAgendas = [...agendaForm];
        updatedAgendas[dataset.index][name.split("_")[0]] = value;
        setAgendaForm(updatedAgendas);
    }  

    function onSubmit(e) {
        e.preventDefault();

        // podaci za ažuriranje stanja sastanka
        const stanjeData = {
            stanje: "Arhiviran"
        };

        // PUT zahtjev za ažuriranje stanja
        const stanjeOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stanjeData),
        };


        // prvo ažuriramo stanje sastanka
        fetch(`${apiUrl}/meetings/${id}`, stanjeOptions)
            .then(() => {
                // ažurira svaku točku dnevnog reda sa zaključkom
                const postConclusionPromises = agendaForm.map(tocka => {
                    const options = {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ zakljucak: tocka.zakljucak }),
                    };
                    return fetch(`${apiUrl}/meetings/${id}/agendapoints/${tocka.id}`, options);
                });
                // nakon uspješnog ažuriranja svih točaka, ažurira stanje sastanka kao "Arhiviran"
                return Promise.all(postConclusionPromises);
            })
            .then(() => {
                navigate('/');
            });
    }

    return (
        <div className="agendabox">
            <h1>Dodaj zaključke:</h1>
            <form onSubmit={onSubmit}>
                {agendaForm.map((tocka, index) => (
                    <div key={index} className="tockelista">
                        <label>Zaključak za {index+1}. točku: "{tocka.naziv}"</label>
                        {!tocka.pravniUcinak && (
                            <div className="nepravne">
                                <textarea
                                    name={`zakljucak_${index}`}
                                    rows="2"
                                    value={tocka.zakljucak || ''}
                                    onChange={onChange}
                                    data-index={index}
                                />
                            </div>
                        )
                        }
                        {tocka.pravniUcinak && (
                            <div className="pravne">
                                <label>Odaberi ishod:</label>
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`zakljucak_${index}`}
                                            value="Izglasan"
                                            checked={tocka.zakljucak === "Izglasan"}
                                            onChange={onChange}
                                            data-index={index}
                                        /> 
                                        Izglasan
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`zakljucak_${index}`}
                                            value="Odbijen"
                                            checked={tocka.zakljucak === "Odbijen"}
                                            onChange={onChange}
                                            data-index={index}
                                        /> 
                                        Odbijen
                                    </label>
                                </div>
                            </div>
                        )}

                    </div>
                ))}
                <button className="arhivirajbutton" type="submit" disabled={!isValid()}>Arhiviraj sastanak</button>
            </form>
        </div>
    );
}

export default DodajZakljucke;
