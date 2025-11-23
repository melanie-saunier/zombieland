# 📧 Mailtrap – Configuration et Utilisation

*(pour l’adresse de service : `zombieland.contact@gmail.com`)*

Mailtrap est un service qui permet de **tester l’envoi d’emails en environnement de développement** sans envoyer de vrais emails aux utilisateurs.
Il capture les emails dans une “boîte de réception sandbox”, visible dans le dashboard Mailtrap.

Cela permet de tester en toute sécurité :

* l’envoi d’emails de confirmation
* les emails de réinitialisation de mot de passe
* les emails transactionnels

---

## 🧑‍💻 1. 📥 Accès au compte Mailtrap

1. Aller sur : [https://mailtrap.io](https://mailtrap.io)
2. Se connecter avec le compte Gmail de contact.zombieland@gmail.com
3. On se retrouve sur la Home page. Il faut récupérer les identificants SMTP pour mettre dans le .env. Actuellement, dans le .env.example il manque l'id user et le password
4. Cliquer sur "My Sandbox" dans la section **Sandbox** (sur la droite)
5. Cliquer sur le username pour le copier et le coller après SMTP_USER= dans le .env
6. Idem pour le mot de passe (il est masqué mais on peut le copier en cliquant dessus). A coller après SMTP_PASS= dans le .env
7. Vérifier les autres informations (SMTP_HOST et SMTP_PORT) mais normalement c'est OK

💡 **REMARQUE :**
L’adresse `zombieland.contact@gmail.com` est **uniquement utilisée comme adresse d’expéditeur**.
Ce n’est pas elle qui envoie réellement les emails : **c’est Mailtrap qui simule l’envoi**.

## 🧪 2. Tester les emails

Après avoir déclenché l’envoi depuis Thunderclient (ex : route `POST /auth/forgot-password`),
aller dans Mailtrap → **Inbox**.

Tu y verras :

* la liste des emails envoyés
* leur contenu
* l’aperçu HTML
* l’aperçu texte
* les headers SMTP
* les liens cliquables (ex : lien de reset password)

---

## ⛑️ 3. Notes de sécurité

* **Ne jamais** committer l’username et password Mailtrap dans Git.
* Ajouter `SMTP_USER` et `SMTP_PASS` dans `.env.example` avec des valeurs fictives :
