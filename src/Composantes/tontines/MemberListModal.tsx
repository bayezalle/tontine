import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

interface Member {
  _id: string;
  firstName: string;
  lastName: string;
  // other properties...
}

const MemberListModal: React.FC<{ tontineId: string; onClose: () => void }> = ({ tontineId, onClose }) => {
  const [nonParticipants, setNonParticipants] = useState<Member[]>([]);

  useEffect(() => {
    const fetchNonParticipants = async () => {
      try {
        const response = await axios.get(
          `https://fewnu-tontin.onrender.com/getTontineById/getTontineById/${tontineId}`
        );
        setNonParticipants(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des membres :", error);
      }
    };

    fetchNonParticipants();
  }, [tontineId]);

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Liste des Membres non Participants</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {nonParticipants.map((member) => (
            <li key={member._id}>{member.firstName} {member.lastName}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MemberListModal;
