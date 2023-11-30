// InfoUser.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Member {
  id: number;
  fisrtName:string;
  lastName: string;
  phoneNumber:number;
}

interface Tontine {
  id: number;
  tontine: string;
  somme: number;
  cotisationDay: string;
  // Autres propriétés si nécessaire
}

const InfoUser: React.FC<{ selectedTontine: Tontine | null }> = ({ selectedTontine }) => {
  const [nonParticipants, setNonParticipants] = useState<Member[]>([]);

  useEffect(() => {
    if (selectedTontine) {
      // Effectuez une requête pour obtenir la liste des membres non participants
      const fetchNonParticipants = async () => {
        try {
          // Utilisez la logique pour déterminer les non participants en comparant avec selectedTontine.participantsActuels
          const response = await axios.get(`https://fewnu-tontin.onrender.com/tontines/getTontines/${selectedTontine.id}`);
          setNonParticipants(response.data.patrticipants);
        } catch (error) {
          console.error('Erreur lors de la récupération des non participants :', error);
        }
      };
      // Appelez la fonction pour récupérer les non participants
      fetchNonParticipants();
    }
  }, [selectedTontine]); // Assurez-vous de définir les dépendances correctes selon vos besoins

  const participer = (userId: number) => {
    // Logique pour faire participer le membre
    // ...
  };

  return (
    <div>
      <h1>Liste des membres non participants</h1>
      {nonParticipants.length > 0 ? (
        <ul>
          {nonParticipants.map((participant) => (
            <li key={participant.id}>
              <span>{participant.fisrtName}</span>
              <span>{participant.lastName}</span>
              <span>{participant.phoneNumber}</span>
              <button onClick={() => participer(participant.id)}>Participer</button>
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
