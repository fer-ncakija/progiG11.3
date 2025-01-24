import React, { useEffect } from "react";
import "./KreirajSastanak.css";
import { useNavigate } from 'react-router-dom';


function KreirajSastanak({ apiUrl, forceLogout }) {

    useEffect(() => {
        forceLogout();
    }, [apiUrl]);

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

        fetch(`${apiUrl}/meetings`, options)    // treba provjeriti je li ruta ispravna (kako je napisana u backu) !!!
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
                </div>
                <div className="submitmeet">
                    <button className="meetbutton" type="submit" disabled={!isValid()}>
                        Kreiraj sastanak
                    </button>
                </div>
            </form>
        </div>
    );
}

export default KreirajSastanak;
