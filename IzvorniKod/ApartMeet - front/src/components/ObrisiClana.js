import React, { useState } from 'react';
import './ObrisiClana.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";



export default function ObrisiClana({ apiUrl, forceLogout }){

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    forceLogout();
    setIsLoading(false);
  }, [apiUrl]);

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
          throw new Error("Greška pri brisanju korisnika");
        }
      })
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        setMessage(error.message);
      });
  }

  if (isLoading) {
    return null;
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