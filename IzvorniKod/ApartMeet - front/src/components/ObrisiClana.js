import React, { useState } from 'react';
import './ObrisiClana.css';
import { useNavigate } from 'react-router-dom';


export default function ObrisiClana({ apiUrl }){

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
      const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(`${apiUrl}/users/${username}`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.body);
        }
      })
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        let errorMessage = error.message;
        setMessage(errorMessage);
      });
  }
  return (
    <div className="obrisi-clana">
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="form-line">
            <p>Korisničko ime:</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="button-div">
            <button className='button-obrisi' type="submit">Obriši Korisnika</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}