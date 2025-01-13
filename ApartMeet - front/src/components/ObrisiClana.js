import React, { useState } from 'react';
import './ObrisiClana.css';

const ObrisiClana = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/delete-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      setMessage(data.message);
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
};

export default ObrisiClana;
