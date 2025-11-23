import nodemailer from "nodemailer";

/**
 * Envoie un email via SMTP
 * @param to - adresse email du destinataire
 * @param subject - objet de l'email
 * @param html - contenu de l'email au format HTML
 */
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    // 1️⃣ Création d'un transporteur SMTP
    // Le transporteur est responsable de l'envoi des emails
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,       // exemple : "smtp.gmail.com"
      port: Number(process.env.SMTP_PORT) || 587, // port SMTP (587 par défaut)
      secure: false,                      // true pour 465 (SSL), false pour les autres ports
      auth: {
        user: process.env.SMTP_USER,      // nom d'utilisateur SMTP
        pass: process.env.SMTP_PASS,      // mot de passe SMTP
      },
    });

    // 2️⃣ Envoi de l'email
    const info = await transporter.sendMail({
      from: `"Zombieland" <${process.env.SMTP_USER}>`, // adresse de l'expéditeur
      to,                                              // destinataire
      subject,                                         // objet de l'email
      html,                                            // contenu HTML de l'email
    });

    // 3️⃣ Log pour vérifier que l'email a bien été envoyé
    console.log("Email envoyé :", info.messageId);
    return info;
  } catch (error) {
    // Gestion des erreurs en cas d'échec de l'envoi
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw new Error("Impossible d'envoyer l'email");
  }
};
