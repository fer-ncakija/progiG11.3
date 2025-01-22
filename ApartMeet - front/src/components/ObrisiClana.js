import React, { useState } from 'react';
import './ObrisiClana.css';
import { useNavigate } from 'react-router-dom';


export default function ObrisiClana({ apiUrl }){

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('${apiUrl}/users/${username}', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        navigate('/');
      } else {
        setMessage('Greška pri brisanju korisnika');
      }
    } catch (error) {
      setMessage('Greška pri brisanju korisnika');
    }
  };
  
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