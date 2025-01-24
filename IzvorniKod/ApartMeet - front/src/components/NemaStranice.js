import React from 'react';
import "./NemaStranice.css";

function NemaStranice({ forceLogout }) {

  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    forceLogout();
    setIsLoading(false);
  }, [apiUrl]);

  if (isLoading) {
    return null;
  }
  
  return (
    <div className="meeting-container">
      <h1 className="nemah1">
        Stranica koju tražite ne postoji ili joj nemate pristup!
      </h1>
      <p className="nemap">
        Molimo Vas da provjerite URL adresu ili se vratite na početnu stranicu.
      </p>
    </div>
  );
}

export default NemaStranice;
