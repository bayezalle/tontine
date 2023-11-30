import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Participant {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
}

const InfoUser: React.FC = () => {
  const [nonParticipants, setNonParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    // Effectuez une requête pour obtenir la liste des membres non participants
    const fetchNonParticipants = async () => {
      try {
        const response = await axios.get('https://fewnu-tontin.onrender.com/tontines/getTontines');
        setNonParticipants(response.data);
        console.log(response.data[5].somme);
        console.log(response.data[5].tontine);
        console.log(response.data[1].somme);
        
      } catch (error) {
        console.error('Erreur lors de la récupération des non participants :', error);
      }
    };

    // Appelez la fonction pour récupérer les non participants
    fetchNonParticipants();
  }, []); // Assurez-vous de définir les dépendances correctes selon vos besoins

  const participer = (userId: string) => {
    // Logique pour faire participer le membre
    // ...
  };

  return (
    <div className="container">
      <h1>Liste des membres non participants</h1>
      {nonParticipants.length > 0 ? (
        <ul>
          {nonParticipants.map((participants) => (
            <li key={participants._id}>
              <span>{participants.firstName} {participants.lastName}</span>
              <button onClick={() => participer(participants._id)}>Participer</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun membre non participant trouvé.</p>
      )}
    </div>
  );
};

export default InfoUser;
