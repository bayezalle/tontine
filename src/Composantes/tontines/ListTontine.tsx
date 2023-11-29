import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";


// Ajoutez une interface pour représenter un participant
interface Participant {
  id: number;
  nom: string;
  // Ajoutez d'autres propriétés si nécessaire
}
// Définissez le type pour une tontine
interface Tontine {
  id: number;
  tontine: string;
  somme: number;
  cotisationDay: string;
  participants: Participant[];
  // Ajoutez d'autres propriétés si nécessaire
}

const ListTontine = () => {
  const [nomTontine, setNomTontine] = useState("");
  const [montantTontine, setMontantTontine] = useState(Number);
  const [jourCotisation, setJourCotisation] = useState("");
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Ajout de l'état pour le terme de recherche
  const [tontines, setTontines] = useState<Tontine[]>([]); // Ajout de l'état pour stocker les tontines

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

  const countParticipants = (tontine: Tontine): number => {
    // Ajoutez votre logique pour calculer le nombre de participants ici
    // Par exemple, si le nombre de participants est stocké dans une propriété participants de votre objet tontine
    // Vous pouvez utiliser tontine.participants ou ajuster selon votre structure de données
    return tontine.participants ? tontine.participants.length : 0;
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
          <label className="form-label">Nom Tontine</label>
          <input
            type="text"
            className="form-control"
            value={nomTontine}
            onChange={(e) => setNomTontine(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Montant</label>
          <input
            type="number"
            className="form-control"
            value={montantTontine}
            onChange={(e) => setMontantTontine(Number(e.target.value))}
            />
        </div>
        <select className="form-select" aria-label="Default select example" 
        value={jourCotisation}
        onChange={(e) => setJourCotisation(e.target.value)}>
            <option selected>Ajouter un jour de cotisation</option>
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
      <div className="row">
        {filteredTontines.map((tontine) => (
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3" key={tontine.id}>
             <div className="card p-3 border-2 shadow">
            <h4 className="fw-bold">{tontine.tontine}</h4>
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
  );
};

export default ListTontine;
