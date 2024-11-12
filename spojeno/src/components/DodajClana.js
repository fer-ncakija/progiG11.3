import { useState } from 'react';
import './DodajClana.css';

export default function DodajClana() {
    // State to store the input data
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        role: "stanar" // default role is "stanar"
    });

    function isValid(){
        const {username, email, password} = formData;
        return username.length > 0 && email.length>0 && password.length>0;
    }

    // Update formData on each input change
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    // Log formData on form submission (connect to backend later)
    function handleSubmit(event) {
        event.preventDefault();
        const data = {
            usrename: formData.userName,
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

        return fetch('/users', options);
     }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="dodajclana-form">
                    <div className="form-line">
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
                        <select
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
                    <button type="submit" /*disabled={!isValid()}*/>Dodaj člana</button>
                </div>
            </form>
        </div>
    );
}
