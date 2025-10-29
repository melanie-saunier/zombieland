import cors from "cors"; 

// Définition de notre configuration pour les CORS. Au début, on permet toutes les routes => A modifier après
const corsOptions = {
  // TODO: changer l'origine quand le front client sera prêt
  origin: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  optionSuccessStatus: 200,
};

// Création de notre middleware de CORS exportable
const corsParser = cors(corsOptions);

export default corsParser;