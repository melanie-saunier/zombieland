import cors from "cors"; 

// Définition de notre configuration pour les CORS. Au début, on permet toutes les routes => A modifier après
const corsOptions = {
  // TODO: changer l'origine quand le front client sera prêt
  origin: "http://localhost:3000", // l'URL du front
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  credentials: true, // obligatoire pour envoyer les cookies HTTPOnly
  optionSuccessStatus: 200,
};

// Création de notre middleware de CORS exportable
const corsParser = cors(corsOptions);

export default corsParser;