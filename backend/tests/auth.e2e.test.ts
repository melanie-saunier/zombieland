import fetch from "node-fetch";

const API_URL = `http://localhost:${process.env.PORT || 3001}/api`;

describe("Auth routes e2e", () => {
  // Données de test pour l'utilisateur
  const testUser = {
    firstname: "Test2",
    lastname: "User2",
    email: "test2@example.com",
    password: "Password123!",
    confirmedPassword: "Password123!"
  };

  // variable pour stocker le cookie récupéré au login
  let loginCookie: string;

  // Type pour typer la réponse JSON des routes auth
  type AuthResponse = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role_id: number;
    role?: { name: string };
    created_at: string;
    updated_at: string;
  };

  // -----------------------------
  // 1️⃣ Test REGISTER
  // -----------------------------
  it("should register a new user", async () => {
    // on envoie la requête POST pour créer un nouvel utilisateur
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testUser),
    });

    // récupération des données JSON de la réponse
    const data = (await res.json()) as AuthResponse;

    // vérifications
    expect(res.status).toBe(200); // succès
    expect(data.email).toBe(testUser.email); // l'email renvoyé correspond
    expect(data).not.toHaveProperty("password"); // le mot de passe n'est pas exposé
  });

  // -----------------------------
  // 2️⃣ Test LOGIN
  // -----------------------------
  it("should login a user and set cookie", async () => {
    // on envoie la requête POST pour se connecter
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      }),
    });

    // récupération des données JSON de la réponse
    const data = (await res.json()) as AuthResponse;

    // récupération du cookie dans les headers
    const rawCookie = res.headers.get("set-cookie");

    // vérifications
    expect(res.status).toBe(200); // la connexion a réussi
    expect(data.email).toBe(testUser.email); // le JSON renvoyé contient bien le bon email
    expect(rawCookie).toBeDefined(); // le cookie est présent
    expect(rawCookie).toMatch(/^token=/); // vérifier que le cookie contient un token

    // on stocke le cookie pour l'utiliser dans les requêtes suivantes
    loginCookie = rawCookie!.split(";")[0];
  });

  // -----------------------------
  // 3️⃣ Test GET /auth/me
  // -----------------------------
  it("should get the current logged-in user", async () => {
    // on envoie la requête GET avec le cookie
    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: { Cookie: loginCookie }
    });

    const data = (await res.json()) as AuthResponse;
    expect(res.status).toBe(200); // la requête a réussi
    expect(data.email).toBe(testUser.email); // l'utilisateur renvoyé est bien le bon
  });

  // -----------------------------
  // 4️⃣ Test LOGOUT
  // -----------------------------
  it("should logout the user", async () => {
    // on envoie la requête POST pour se déconnecter avec le cookie
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: { Cookie: loginCookie }
    });
    const rawCookie = res.headers.get("set-cookie");
    const data = (await res.json()) as AuthResponse;
    
    expect(res.status).toBe(200); // la déconnexion a réussi
    // Vérifie que le cookie "token" est présent mais vidé/expiré
    expect(rawCookie).toBeDefined();
    expect(rawCookie).toMatch(/token=;/); // token vidé
    expect(rawCookie).toMatch(/Expires=/); // token expiré
  });
});
