import React, { useState } from 'react';
import './PromijeniLozinku.css';
import { useNavigate } from 'react-router-dom';


export default function PromijeniLozinku({ apiUrl, userName }) {

  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Nove lozinke se ne podudaraju');
      return;
    }

    const options = {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
    };
    fetch(`${apiUrl}/users/${userName}`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error("Greška pri promjeni lozinke");
        }
      })
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        setMessage(error.message);
      });
  };
  

  return (
    <div className="promijeni-lozinku">
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="form-line">
            <p>Trenutna lozinka:</p>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-line">
            <p>Nova lozinka:</p>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-line">
            <p>Potvrdi novu lozinku:</p>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-div">
            <button className='button-promijeni' type="submit">Promijeni lozinku</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );

}