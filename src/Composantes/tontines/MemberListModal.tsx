// MemberListModal.js

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Member {
    _id: number;
    fiesrtName: string;
    lastName :string;
    // other properties...
  }
  
const MemberListModal: React.FC<{ tontineId: number; onClose: () => void }> = ({ tontineId, onClose }) => {
    const [nonParticipants, setNonParticipants] = useState<Member[]>([]);

  useEffect(() => {
    const fetchNonParticipants = async () => {
      try {
        const response = await axios.get(
          `https://fewnu-tontin.onrender.com/members/nonParticipants/${tontineId}`
        );
        setNonParticipants(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des membres :", error);
      }
    };

    fetchNonParticipants();
  }, [tontineId]);

  return (
    <div>
      <h2>Liste des Membres non Participants</h2>
      <ul>
        {nonParticipants.map((member) => (
          <li key={member._id}>{member.fiesrtName}</li>
        ))}
      </ul>
      <button onClick={onClose}>Fermer</button>
    </div>
  );
};

export default MemberListModal;
