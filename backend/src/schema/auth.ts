import z from "zod";

export const registerSchema = z.object({
  email: z.email("Le format de l'email n'est pas valide"),
  lastname: z.string().trim().min(1, "Le nom de famille est obligatoire"),
  firstname: z.string().trim().min(1,  "Le prénom est obligatoire"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    // check minuscule
    .regex(/^(?=.*[a-z]).*$/, "Le mot de passe doit contenir au moins une lettre minuscule")
    // check majuscule
    .regex(/^(?=.*[A-Z]).*$/, "Le mot de passe doit contenir au moins une lettre majuscule")
    // check chiffre
    .regex(/^(?=.*\d).*$/, "Le mot de passe doit contenir au moins un chiffre")
    // check caractère spécial
    .regex(/^(?=.*[!@#$%^&*]).*$/, "Le mot de passe doit contenir au moins un caractère spécial"),
  confirmedPassword: z.string(),
})
.refine((data) => data.password === data.confirmedPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmedPassword"], // indique où afficher l'erreur
});

export type registerSchemaInput = z.infer<typeof registerSchema>;