import React from "react";
import "./DodajSastanak.css";
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

function DodajSastanak(){

    const navigate = useNavigate();

    const [meetForm, setMeetForm] = React.useState({
        naslov: "",
        sazetak: "",
        vrijeme: "",
        mjesto: "",
        tockeDnevnogReda: [{ naziv: "", pravniUcinak: false }],
        stanje: "planiran"
    });

    // provjera je li forma za prijavu ispravna
    function isValid() {
        const { naslov, sazetak, vrijeme, mjesto, tockeDnevnogReda } = meetForm;
        return naslov.length > 0 && sazetak.length > 0 && vrijeme.length > 0 && mjesto.length > 0 && 
            tockeDnevnogReda.every(tocka => tocka.naziv.length > 0);
    }

    // ažurira podatke u formi na temelju korisnikovog unosa
    function onChange(event) {
        const { name, value, dataset } = event.target;
        if (dataset.index !== undefined) {
            const tockeDnevnogReda = [...meetForm.tockeDnevnogReda];
            tockeDnevnogReda[dataset.index][name] = name === "pravniUcinak" ? event.target.checked : value;
            setMeetForm((oldForm) => ({ ...oldForm, tockeDnevnogReda }));
        } else {
            setMeetForm((oldForm) => ({ ...oldForm, [name]: value }));
        }
    }

    function addTocka() {
        setMeetForm((oldForm) => ({
            ...oldForm,
            tockeDnevnogReda: [...oldForm.tockeDnevnogReda, { naziv: "", pravniUcinak: false }]
        }));
    }
    
    function removeTocka(index) {
        setMeetForm((oldForm) => ({
            ...oldForm,
            tockeDnevnogReda: oldForm.tockeDnevnogReda.filter((_, i) => i !== index)
        }));
    }
    
    // funkcija za obradu slanja forme
    function onSubmit(e) {
        e.preventDefault();

        const data = {
            naslov: meetForm.naslov,
            sazetak: meetForm.sazetak,
            vrijeme: meetForm.vrijeme,
            mjesto: meetForm.mjesto,
            tockeDnevnogReda: meetForm.tockeDnevnogReda
        };
        
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/meetings`, options)
            .then(response => response.json())
            .then(() => {
                navigate('/');
            });
    }

    return(
        <div className="meetbox">
            <form onSubmit={onSubmit}>
                <div className="meetinputs">
                    <label>Naslov sastanka</label>
                    <div className="meetinput">
                        <input
                            name="naslov"
                            placeholder="Naslov sastanka"
                            onChange={onChange}
                            value={meetForm.naslov}
                        />
                    </div>
                    <label>Sažetak namjere sastanka</label>
                    <div className="meetinput">
                        <input
                            name="sazetak"
                            placeholder="Sažetak namjere sastanka"
                            onChange={onChange}
                            value={meetForm.sazetak}
                        />
                    </div>
                    <label>Datum i vrijeme sastanka</label>
                    <div className="meetinput">
                        <input
                            name="vrijeme"
                            type="datetime-local"
                            placeholder="Datum i vrijeme sastanka"
                            onChange={onChange}
                            value={meetForm.vrijeme}
                        />
                    </div>
                    <label>Mjesto održavanja sastanka</label>
                    <div className="meetinput">
                        <input
                            name="mjesto"
                            placeholder="Mjesto održavanja sastanka"
                            onChange={onChange}
                            value={meetForm.mjesto}
                        />
                    </div>
                    {meetForm.tockeDnevnogReda.map((tocka, index) => (
                        <div key={index}>
                            <label>Točka dnevnog reda {index + 1}</label>
                            <div className="tockainput">
                                <input
                                    name="naziv"
                                    placeholder={`tocka dnevnog reda ${index + 1}`}
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
                <div className="submitmeet">
                    <button className="meetbutton" type="submit" disabled={!isValid()}>
                        Dodaj sastanak
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DodajSastanak;
