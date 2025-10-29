import { z } from "zod";

// schema de validation pour l'id
export const idSchema = z.object({
  id: z.coerce.number().int().positive(), // .coerce.number() permet de convertir une chaine de caractere en nombre
});

// note sur.z.coerce 
/*
  z.coerce permet de convertir une valeur en un type spécifique.
  Par exemple, z.coerce.number() convertit une chaîne de caractères ou un booléen, en nombre.
  Cela est utile pour s'assurer que les données reçues sont du type attendu, même si elles sont envoyées sous forme de chaîne de caractères.
  
  > coerce est un objet de z qui expose les memes méthodes que z, mais dans lesquelles les valeurs sont converties en types attendus.
*/