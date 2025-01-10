import React, { useEffect } from "react";
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
    });

    // provjera je li forma za prijavu ispravna
    function isValid() {
        const { naslov, sazetak, vrijeme, mjesto } = meetForm;
        return naslov.length > 0 && sazetak.length > 0 && vrijeme.length > 0 && mjesto.length > 0;
    }

    // ažurira podatke u formi na temelju korisnikovog unosa
    function onChange(event) {
        const { name, value } = event.target;
        setMeetForm((oldForm) => ({ ...oldForm, [name]: value }));
    }

    // funkcija za obradu slanja forme
    function onSubmit(e) {
        e.preventDefault();

        const data = {
        naslov: meetForm.naslov,
        sazetak: meetForm.sazetak,
        vrijeme: meetForm.vrijeme,
        mjesto: meetForm.mjesto,
        };
        const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        };
        fetch(`${apiUrl}/meetings`, options)  // mora se dodati ruta za meetings u backendu (mozda ce biti drugacije ime)
            .then(response => {
                return response.json();
            })
            .then(() => {
                navigate('/');
            })
    }


    return(
        <div className="meetbox">
            <form onSubmit={onSubmit}>
                <div className="meetinputs">
                    <div className="meetinput">
                        <input
                            name="naslov"
                            placeholder="naslov sastanka"
                            onChange={onChange}
                            value={meetForm.naslov}
                        />
                    </div>
                    <div className="meetinput">
                        <input
                            name="sazetak"
                            placeholder="sazetak"
                            onChange={onChange}
                            value={meetForm.sazetak}
                        />
                    </div>
                    <div className="meetinput">
                        <input
                            name="vrijeme"
                            type="datetime-local"
                            placeholder="datum i vrijeme"
                            onChange={onChange}
                            value={meetForm.vrijeme}
                        />
                    </div>
                    <div className="meetinput">
                        <input
                            name="mjesto"
                            placeholder="mjesto"
                            onChange={onChange}
                            value={meetForm.mjesto}
                        />
                    </div>
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