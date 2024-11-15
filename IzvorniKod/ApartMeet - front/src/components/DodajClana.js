import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DodajClana.css';

const apiUrl = process.env.REACT_APP_API_URL;

export default function DodajClana() {

    const navigate = useNavigate();

    //state za cuvanje podataka o novom dodanom clanu
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        role: "stanar" 
    });

    function isValid(){
        const {userName, email, password} = formData;
        return userName.length > 0 && email.length>0 && password.length>0;
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [event.target.name]: event.target.value
            })
        )
    }

    //funkcija koja obraduje submit i salje podatke na backend
    function handleSubmit(event) {
        event.preventDefault();
        const data = {
            username: formData.userName,
            email: formData.email,
            password: formData.password,
            role: formData.role
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        };

        fetch(`${apiUrl}/users`, options)
            .then(response => {
                return response.json();
            })
            .then(() => {
                navigate('/');
            })
     }


    //forma za dodavanje novog clana
    return(
        <div className='meeting-container'>
            <form onSubmit={handleSubmit} >
                <div className='dodajclana-form'>
                    <div className='form-line'>
                        <p>Korisničko ime:</p>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="userName"
                            value={formData.userName}
                        />
                    </div>
                    <div className="form-line">
                        <p>E-mail:</p>
                        <input
                            type="email"
                            onChange={handleChange}
                            name="email"
                            value={formData.email}
                        />
                    </div>
                    <div className="form-line">
                        <p>Lozinka:</p>
                        <input
                            type="password"
                            onChange={handleChange}
                            name="password"
                            value={formData.password}
                        />
                    </div>
                    <div className="form-line">
                        <p>Uloga:</p>
                        <select className='select-form-line'
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="predstavnik">Predstavnik</option>
                            <option value="stanar">Stanar</option>
                        </select>
                    </div>
                </div>

                <div className="button-div">
                    <button type="submit" disabled={!isValid()}>Dodaj člana</button>
                </div>
            </form>
        </div>
    );
}
