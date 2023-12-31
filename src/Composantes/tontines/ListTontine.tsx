import React, { useState, useEffect } from "react";
import "./Tontine.css"
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { useHistory } from 'react-router-dom';
// import MemberListModal from "./MemberListModal";

// Ajoutez une interface pour représenter un participant
interface Participant {
  id: number;
  nom: string;
}
// Définissez le type pour une tontine
interface Tontine {
  id: string;
  tontine: string;
  somme: number;
  cotisationDay: string;
  participants: Participant[]; 
  participantsActuels: number[];
}
interface Member {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  // other properties...
}

const ListTontine: React.FC = () => {
  const [nomTontine, setNomTontine] = useState("");
  const [montantTontine, setMontantTontine] = useState(Number);
  const [debut, setDebut] = useState(""); // Ajout de l'état pour 'date debut'
  const [fin, setFin] = useState(""); // Ajout de l'état pour 'date fin'
  const [nbMembre, setNbMembre] = useState("");
  const [jourCotisation, setJourCotisation] = useState("");
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Ajout de l'état pour le terme de recherche
  const [tontines, setTontines] = useState<Tontine[]>([]); // Ajout de l'état pour stocker les tontines
  const [selectedTontineId, setSelectedTontineId] = useState<string | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  
  const history = useHistory();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filtrer les tontines en fonction du terme de recherche
  const filteredTontines = tontines.filter((tontine) =>
    tontine.tontine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTontine = async (nomTontine: string, montantTontine: number, jourCotisation: string) => {
    try {
      // Préparez les données de la tontine
      const tontineData = {
        tontine: nomTontine,
        somme: montantTontine,
        cotisationDay: jourCotisation,
      };
  
      // Effectuez la requête POST vers votre API
      const response = await axios.post('https://fewnu-tontin.onrender.com/addTontine/addTontine', tontineData);
  
      // Traitez la réponse de l'API ici si nécessaire
      console.log('Tontine ajoutée avec succès :', response.data);
      alert('Tontine ajoutée avec succès');

      // Déclenchez un changement dans addedSuccessfully pour réinitialiser le formulaire
      setAddedSuccessfully(true);
    } catch (error) {
      // Gérez les erreurs ici
      console.error("Erreur lors de l'ajout de la tontine :", error);
   
      // Affichez un message d'erreur convivial à l'utilisateur
      alert("Une erreur s'est produite lors de l'ajout de la tontine. Veuillez réessayer plus tard.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Passez les valeurs actuelles à la fonction addTontine
    addTontine(nomTontine, montantTontine, jourCotisation);
  };

  // Utilisez useEffect pour réinitialiser les valeurs du formulaire lorsque addedSuccessfully change
  useEffect(() => {
    if (addedSuccessfully) {
      setNomTontine("");
      setMontantTontine(0);
      setJourCotisation("");
      setAddedSuccessfully(false);
    }
  }, [addedSuccessfully]);

  useEffect(() => {
    // Fonction pour récupérer les tontines depuis l'API
    const fetchTontines = async () => {
      try {
        const response = await axios.get(
          "https://fewnu-tontin.onrender.com/tontines/getTontines"
        );
        setTontines(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tontines :", error);
      }
    };
    // Appel de la fonction pour récupérer les tontines
    fetchTontines();
  }, [addedSuccessfully]);

    //conter le nombre de participant
  const countParticipants = (tontine: Tontine): number => {
    // Vous pouvez utiliser tontine.participants ou ajuster selon votre structure de données
    return tontine.participants ? tontine.participants.length : 0;
  };
  
  useEffect(() => {
    // Récupérer la liste des utilisateurs
    axios
      .get('https://fewnu-tontin.onrender.com/user/profile')
      .then((response) => {
        setMembers(response.data);        
      })
      .catch((error) => {
        console.error('Failed to fetch members:', error.message);
      });
  }, [selectedTontineId]); 

  useEffect(() => {
    if (selectedTontineId) {
      // Récupérer la liste des membres spécifiques à la tontine
      axios
        .get(`https://fewnu-tontin.onrender.com/getTontineById/getTontineById/${selectedTontineId}`)
        .then((response) => {
          setMembers(response.data);
          console.log(members);
        })
        .catch((error) => {
          console.error('Failed to fetch members:', error.message);
        });
    }
  }, [selectedTontineId]);
  
  const participer = (userId: string) => {
    if (selectedTontineId) {
      // Logique pour faire participer le membre à la tontine spécifiée
      // Vous pouvez utiliser l'ID de la tontine (selectedTontineId) et l'ID du membre (userId) pour effectuer l'opération appropriée
      // Par exemple, vous pouvez envoyer une requête POST à l'API pour ajouter le membre à la tontine
      axios.post(`https://fewnu-tontin.onrender.com/tontines/addMember/${selectedTontineId}`, { userId })
        .then((response) => {
          // Traitez la réponse si nécessaire
          console.log('Membre ajouté avec succès à la tontine :', response.data);
          alert('Membre ajouté avec succès à la tontine');
          // Fermez le modal ou effectuez d'autres actions nécessaires
        })
        .catch((error) => {
          // Gérez les erreurs ici
          console.error("Erreur lors de l'ajout du membre à la tontine :", error);
          // Affichez un message d'erreur convivial à l'utilisateur
          alert("Une erreur s'est produite lors de l'ajout du membre à la tontine. Veuillez réessayer plus tard.");
        });
    }
  };
  
  
 
  
  return (
    <div className="container pt-5 mt-3">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 gap-5">
          <div>
            <h1>Tontines</h1>
          </div>
          <div className="input-group mb-3 w-50">
            <span className="input-group-text" id="basic-addon1">
              <FaSearch className="recherche" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Recherche"
              aria-label="Recherche"
              aria-describedby="basic-addon1"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="row p-3">
        <div className="d-flex justify-content-end gap-5 align-items-baseline">
          <p>Ajouter une tontine :</p>
          <button
            type="button"
            className="px-2 rounded text-light fs-5 fw-bold add-member"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            +
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Ajouter une nouvelle tontine
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body px-3">
                  <div className="container">
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Nom Tontine</label>
          <input
            type="text"
            className="form-control"
            value={nomTontine}
            onChange={(e) => setNomTontine(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Montant</label>
          <input
            type="number"
            className="form-control"
            value={montantTontine}
            onChange={(e) => setMontantTontine(Number(e.target.value))}
            />
            </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Date Debut</label>
          <input
            type="date"
            className="form-control"
            value={debut}
            onChange={(e) => setDebut(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Date Fin</label>
          <input
            type="date"
            className="form-control"
            value={fin}
            onChange={(e) => setFin(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Total Membre</label>
          <input
            type="number"
            className="form-control"
            value={nbMembre}
            onChange={(e) => setNbMembre(e.target.value)}
          />
        </div>
        
            <select className="form-select" aria-label="Default select example" 
            value={jourCotisation}
            onChange={(e) => setJourCotisation(e.target.value)}>
                <option selected>Ajouter un jour de cotisation</option>
                <option value="Chaque jour">Chaque jour</option>
                <option value="Lundi">Lundi</option>
                <option value="Mardi">Mardi</option>
                <option value="Mercredi">Mercredi</option>
                <option value="Jeudi">Jeudi</option>
                <option value="Vendredi">Vendredi</option>
                 <option value="Samrdi">Samedi</option>
                <option value="Dimanche">Dimanche</option>
            </select>
            <button type="submit" className="btn btn-primary mt-3">
              Enregistrer
            </button>
              </form>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*bblblbllblllblblbllblbl  */}
      <div>
    <div className="row mt-3 ">
        {filteredTontines.map((tontine) => (
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3" key={tontine.id}>
            <div className="card p-3 border-2 shadow">
              <div className="d-flex justify-content-between align-itemes-center mb-2">
              <h4 className="fw-bold">{tontine.tontine}</h4>
              <button
                className="btn btn-sm rounded btn-ton d-flex gap-2 align-items-center"
                data-bs-toggle="modal" data-bs-target="#exampleModal10"
                onClick={() => setSelectedTontineId(tontine.id)}
                >
                <FaUserPlus />
              </button>
            </div>
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-md-4 mb-2">
                <span className="fw-bold">Montant Global</span><br/><span>{tontine.somme} Fcfa</span>
              </div>
              <div className="col-md-4 mb-2">
                  <span className="fw-bold">Jour de cotisation<br/></span><span>{tontine.cotisationDay}</span>
              </div>
              <div className="col-md-4 mb-2">
                <span className="fw-bold">Participants<br/></span><span className="fw-semibold"> {countParticipants(tontine)}</span>
              </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* modal ajout membres no participants */}
    <div className="modal fade" id="exampleModal10"  aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header gap-5">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Liste des Membres</h1>
          <div className="input-group mb-3 w-50">
            <span className="input-group-text" id="basic-addon1">
              <FaSearch className="recherche" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Recherche"
              aria-label="Recherche"
              aria-describedby="basic-addon1"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Prenom</th>
                <th scope="col">Nom</th>
                <th scope="col">Telephone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td>{member.firstName}</td>
                <td>{member.lastName}</td>
                <td>{member.phoneNumber}</td>
                <td>
                  <button type="button"
                    className="btn btn-sm btn-secondary mb-2"
                    onClick={() => participer(member._id)}
                  >
                    Ajouter
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ListTontine;
