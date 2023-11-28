import React, { useState, useEffect } from "react";
import axios from "axios";

const AjoutTon = () => {
  const [nomTontine, setNomTontine] = useState("");
  const [montantTontine, setMontantTontine] = useState(Number);
  const [jourCotisation, setJourCotisation] = useState("");
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);

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
    //   console.log('Tontine ajoutée avec succès :', response.data);
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

  return (
    <>
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
        {/* <div className="mb-3">
          <label className="form-label">Jour Cotisation</label>
          <input
            type="text"
            className="form-control"
            value={jourCotisation}
            onChange={(e) => setJourCotisation(e.target.value)}
          />
        </div> */}
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
        <button type="submit" className="btn btn-primary">
          Enregistrer
        </button>
      </form>
      </div>
    </>
  );
};

export default AjoutTon;

{/* <form onSubmit={handleSubmit}>
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
        <div className="mb-3">
          <label className="form-label">Jour Cotisation</label>
          <input
            type="text"
            className="form-control"
            value={jourCotisation}
            onChange={(e) => setJourCotisation(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enregistrer
        </button>
      </form> */}