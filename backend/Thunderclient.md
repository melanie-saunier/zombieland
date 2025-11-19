# 📝 Procédure pour tester l’authentification CSRF avec Thunder Client

## 1️⃣ Vider les cookies de Thunder Client

Avant de commencer, il faut **supprimer tous les cookies stockés** pour éviter d’envoyer d’anciens cookies invalides.

* Ouvre Thunder Client
* Clique sur les **trois petits points** en haut à droite
* Sélectionne **Cookie Manager**
* Clique sur **Delete All**

> Cela garantit que le cookie `csrf-secret` sera toujours à jour.

## 2️⃣ Récupérer un CSRF token

* Effectue une requête **GET** sur :

  ```
  http://localhost:3001/api/csrf-token
  ```
* Dans la réponse, tu devrais obtenir :

  ```json
  {
    "csrfToken": "VSkjiHH3--Coo1NPtxH721j7oIWNE17ODCaY"
  }
  ```
* Vérifie dans l’onglet **Cookies** de Thunder Client qu’un cookie `csrf-secret` a été créé pour `localhost:3001`.

## 3️⃣ Faire la requête de login

* Crée une requête **POST** sur :

  ```
  http://localhost:3001/api/auth/login
  ```

* **Headers** :

  ```
  Set-Cookie: csrf-secret=<valeur du csrf-secret récupéré à l’étape 3>
  x-csrf-token: <valeur du csrfToken récupéré à l’étape 2>
  ```

* **Body** :

  ```json
  {
    "email": "ton.email@example.com",
    "password": "tonMotDePasse"
  }
  ```

* Envoie la requête.

* Si tout est correct, tu devrais obtenir un **200 OK** avec les informations de l’utilisateur.
* Dans les headers de la requête se trouve le token JWT d'authentification. Il faut bien le mettre dans le Set-Cookie des headers des prochaines requêtes : 

```
Set-Cookie: csrf-secret=<valeur du csrf-secret récupéré à l’étape 3>; token=<valeur du token JWT à récupérer lors du login>
x-csrf-token: <valeur du csrfToken récupéré à l’étape 2>
```

## 4️⃣ Astuces si ça ne fonctionne pas

* Toujours **vider les cookies** si tu changes de token CSRF.
* Vérifie que le **csrfToken et csrf-secret correspondent** (ils sont générés en même temps).
* Assure-toi que le cookie est bien envoyé dans la requête (onglet Cookies de Thunder Client).

---

Ensuite, on peut faire des requêtes qui nécessitent d'être connecté (faire une réservation, modifier son profil, ...)