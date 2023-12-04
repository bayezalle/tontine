import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Participants {
  _id: string;
  // firstName: string;
  // lastName: string;
  // phoneNumber: number;
  // email: string;
}

interface Tontine {
  _id: string;
  tontine:string;
  participants: Participants[];
}

const InfoUser: React.FC = () => {
  const [tontines, setTontines] = useState<Tontine[]>([]);

  useEffect(() => {
    // Effectuez une requête pour obtenir la liste des tontines avec leurs participants
    const fetchTontines = async () => {
      try {
        const response = await axios.get('https://fewnu-tontin.onrender.com/tontines/getTontines');
        setTontines(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tontines :', error);
      }
    };

    // Appelez la fonction pour récupérer les tontines
    fetchTontines();
  }, []); // Assurez-vous de définir les dépendances correctes selon vos besoins

  const participer = (userId: string) => {
    // Logique pour faire participer le membre
    // ...
  };

  return (
    <div className="container">
      <h1>Liste des participants par tontine</h1>
      {tontines.length > 0 ? (
        <ul>
          {tontines.map((tontine) => (
            <li key={tontine._id}>
              {/* <h2>Tontine ID: {tontine._id}</h2> */}
              <h3>{tontine.tontine}</h3>
              {tontine.participants.length > 0 ? (
                <table className="table border table-striped">
                  <thead>
                    <tr>
                      <th>Id Participant</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {tontine.participants.map((participant) => (
                    <tr key={participant._id}>
                      <td>{participant._id}</td>
                      <td><button className="btn btn-sm btn-secondary mb-2" 
                      onClick={() => participer(participant._id)}>Participer</button></td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              ) : (
                <p>Aucun participant trouvé pour cette tontine.</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune tontine trouvée.</p>
      )}
    </div>
  );
};

export default InfoUser;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// interface User {
//   _id:string;
//   fierstName:string;
//   lastName:string;
//   phonenumber:string;
//   email:string
// }
// interface Participants {
//   _id: string;
// }

// interface Tontine {
//   _id: string;
//   tontine: string;
//   participants: Participants[];
// }

// const InfoUser: React.FC = () => {
//   const [tontines, setTontines] = useState<Tontine[]>([]);
//   const [members, setMembers] = useState<User[]>([]);

//   useEffect(() => {
//     // Récupérer la liste des utilisateurs
//     axios
//       .get("https://fewnu-tontin.onrender.com/user/profile")
//       .then((response) => {
//         setMembers(response.data);
//       })
//       .catch((error) => {
//         console.error("Failed to fetch members:", error.message);
//       });
//   }, []); // Le tableau vide comme deuxième argument signifie que ce code s'exécute une seule fois après le montage initial.


//   useEffect(() => {
//     // Effectuez une requête pour obtenir la liste des tontines avec leurs participants
//     const fetchTontines = async () => {
//       try {
//         const response = await axios.get('https://fewnu-tontin.onrender.com/tontines/getTontines');
//         setTontines(response.data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des tontines :', error);
//       }
//     };

//     // Appelez la fonction pour récupérer les tontines
//     fetchTontines();
//   }, []); // Assurez-vous de définir les dépendances correctes selon vos besoins

//   const participer = (userId: string) => {
//     // Logique pour faire participer le membre
//     // ...
//   };

//   return (
//     <div className="container">
//       <h1>Liste des participants par tontine</h1>
//       {tontines.length > 0 ? (
//         <ul>
//           {tontines.map((tontine) => (
//             <li key={tontine._id}>
//               <h3>{tontine.tontine}</h3>
//               {tontine.participants.length > 0 ? (
//                 <table className="table border border-2 table-striped">
//                   <thead>
//                     <tr>
//                       <th>Id Participant</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                   {tontine.participants
//                     .filter((participant) => 
//                       !members.some((member) => member._id === participant._id)
//                     )
//                     .map((participant) => (
//                       <tr key={participant._id}>
//                         <td>{participant._id}</td>
//                         <td>
//                           <button
//                             className="btn btn-sm btn-secondary mb-2"
//                             onClick={() => participer(participant._id)}
//                           >
//                             Participer
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <p>Aucun participant trouvé pour cette tontine.</p>
//               )}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Aucune tontine trouvée.</p>
//       )}
//     </div>
//   );
// };

// export default InfoUser;
