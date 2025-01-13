import React from "react";
import "./DodajTocke.css";
import { useNavigate, useParams } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

function DodajTocke() {
    const navigate = useNavigate();
    const { id } = useParams(); // dohvaćanje ID-a sastanka iz URL-a

    const [pointForm, setPointForm] = React.useState({
        tockeDnevnogReda: [{ naziv: "", pravniUcinak: false }],
    });

    // provjera je li forma za prijavu ispravna
    function isValid() {
        const { tockeDnevnogReda } = pointForm;
        return tockeDnevnogReda.every(tocka => tocka.naziv.length > 0);
    }

    // ažurira podatke u formi na temelju korisnikovog unosa
    function onChange(event) {
        const { name, value, dataset } = event.target;
        if (dataset.index !== undefined) {
            const tockeDnevnogReda = [...pointForm.tockeDnevnogReda];
            tockeDnevnogReda[dataset.index][name] = name === "pravniUcinak" ? event.target.checked : value;
            setPointForm((oldForm) => ({ ...oldForm, tockeDnevnogReda }));
        } else {
            setPointForm((oldForm) => ({ ...oldForm, [name]: value }));
        }
    }

    function addTocka() {
        setPointForm((oldForm) => ({
            ...oldForm,
            tockeDnevnogReda: [...oldForm.tockeDnevnogReda, { naziv: "", pravniUcinak: false }]
        }));
    }

    function removeTocka(index) {
        setPointForm((oldForm) => ({
            ...oldForm,
            tockeDnevnogReda: oldForm.tockeDnevnogReda.filter((_, i) => i !== index)
        }));
    }

// funkcija za obradu slanja forme
function onSubmit(e) {
    e.preventDefault();

    // podaci za ažuriranje stanja sastanka
    const stanjeData = {
        stanje: "Objavljen"
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
        .then(response => response.json())
        .then(() => {
            // nakon uspješnog ažuriranja stanja, dodajemo točke dnevnog reda
            const tockeDnevnogRedaData = {
                tockeDnevnogReda: pointForm.tockeDnevnogReda
            };

            const tockeDnevnogRedaOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tockeDnevnogRedaData),
            };

            return fetch(`${apiUrl}/meetings/${id}/agendapoints`, tockeDnevnogRedaOptions);
        })
        .then(response => response.json())
        .then(() => {
            navigate('/');
        });
}


    return (
        <div className="pointbox">
            <form onSubmit={onSubmit}>
                <div className="pointinputs">
                    {pointForm.tockeDnevnogReda.map((tocka, index) => (
                        <div key={index}>
                            <label>{index + 1}. Točka dnevnog reda </label>
                            <div className="tockainput">
                                <input
                                    name="naziv"
                                    placeholder={`${index + 1}. Točka dnevnog reda`}
                                    onChange={onChange}
                                    value={tocka.naziv}
                                    data-index={index}
                                />
                                <label>
                                    Pravni učinak
                                    <input
                                        type="checkbox"
                                        name="pravniUcinak"
                                        onChange={onChange}
                                        checked={tocka.pravniUcinak}
                                        data-index={index}
                                    />
                                </label>
                                {index > 0 && (
                                    <button type="button" onClick={() => removeTocka(index)}>
                                        Ukloni
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="addpoint">
                    <button className="addbutton" type="button" onClick={addTocka}>Dodaj točku dnevnog reda</button>
                </div>
                <div className="submitpoint">
                    <button className="pointbutton" type="submit" disabled={!isValid()}>
                        Objavi sastanak
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DodajTocke;
