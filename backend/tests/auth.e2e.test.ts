import request from "supertest";
import { app } from "../src/index.js";

describe("Auth routes e2e", () => {
  // Données de test pour l'utilisateur
  const testUser = {
    firstname: "Test2",
    lastname: "User2",
    email: "test2@example.com",
    password: "Password123!",
    confirmedPassword: "Password123!"
  };

  // Variables pour stocker les cookies et le token CSRF
  let loginCookie: string;
  let csrfCookie: string;
  let csrfToken: string;

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
  // Avant chaque test POST/PUT/PATCH/DELETE, récupérer un nouveau CSRF token
  // -----------------------------
  beforeEach(async () => {
    const res = await request(app).get("/api/csrf-token");
    const setCookieHeader = res.headers["set-cookie"];
    if (!setCookieHeader) throw new Error("No set-cookie header found");

    const setCookieArray = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
    const rawCsrfCookie = setCookieArray.find((c) => c.startsWith("csrf-secret="));
    if (!rawCsrfCookie) throw new Error("No csrf-secret cookie found");

    csrfCookie = rawCsrfCookie.split(";")[0];
    csrfToken = res.body.csrfToken;
    expect(csrfToken).toBeDefined();
  });

  // -----------------------------
  // Fonction utilitaire pour envoyer les deux cookies
  // -----------------------------
  const withCookies = () => [csrfCookie, loginCookie].join("; ");

  // -----------------------------
  // 1️⃣ Test REGISTER
  // -----------------------------
  describe("POST /auth/register", () => {
      it("should register a new user successfully", async () => {
        const res = await request(app)
          .post("/api/auth/register")
          .set("x-csrf-token", csrfToken)
          .set("Cookie", csrfCookie)
          .send(testUser);

        const data = res.body as AuthResponse;

        expect(res.status).toBe(200);
        expect(data.email).toBe(testUser.email);
        expect(data).not.toHaveProperty("password");
      });

      it("should fail if email already exists", async () => {
        const res = await request(app)
          .post("/api/auth/register")
          .set("x-csrf-token", csrfToken)
          .set("Cookie", csrfCookie)
          .send(testUser);

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("An account with this email address already exists.");
      });

      it("should fail if validation fails (invalid email format)", async () => {
        const res = await request(app)
          .post("/api/auth/register")
          .set("x-csrf-token", csrfToken)
          .set("Cookie", csrfCookie)
          .send({ ...testUser, email: "invalid-email" });

        expect(res.status).toBe(400);
        expect(res.body.errors).toBeDefined();
      });

      it("should fail if firstname is empty", async () => {
        const res = await request(app)
          .post("/api/auth/register")
          .set("x-csrf-token", csrfToken)
          .set("Cookie", csrfCookie)
          .send({ ...testUser, firstname: "" });

        expect(res.status).toBe(400);
        expect(res.body.errors).toBeDefined();
      });

      it("should fail if lastname is empty", async () => {
        const res = await request(app)
          .post("/api/auth/register")
          .set("x-csrf-token", csrfToken)
          .set("Cookie", csrfCookie)
          .send({ ...testUser, lastname: "" });

        expect(res.status).toBe(400);
        expect(res.body.errors).toBeDefined();
      });

      it("should fail if passwords do not match", async () => {
        const res = await request(app)
          .post("/api/auth/register")
          .set("x-csrf-token", csrfToken)
          .set("Cookie", csrfCookie)
          .send({ ...testUser, confirmedPassword: "WrongPassword" });

        expect(res.status).toBe(400);
        expect(res.body.errors).toBeDefined();
      });

      it("should fail if password does not respect the rules", async () => {
        const res = await request(app)
          .post("/api/auth/register")
          .set("x-csrf-token", csrfToken)
          .set("Cookie", csrfCookie)
          .send({ ...testUser, password: "1234" });

        expect(res.status).toBe(400);
        expect(res.body.errors).toBeDefined();
      });

      it("should fail if invalid CSRF token", async () => {
        const res = await request(app)
          .post("/api/auth/register")
          .set("x-csrf-token", "invalid-csrf-token")
          .set("Cookie", withCookies())
          .send(testUser);

        expect(res.status).toBe(403);
        expect(res.body.error).toBe("Invalid CSRF token");
      });

      it("should fail if missing CSRF token", async () => {
        const res = await request(app)
          .post("/api/auth/register")
          .set("Cookie", csrfCookie) // Pas de x-csrf-token
          .send(testUser);

        expect(res.status).toBe(403);
        expect(res.body.error).toBe("Missing CSRF token ");
      });

      it("should fail if missing CSRF secret", async () => {
        const res = await request(app)
          .post("/api/auth/register")
          .set("x-csrf-token", csrfToken) // Pas de cookie
          .send(testUser);

        expect(res.status).toBe(403);
        expect(res.body.error).toBe("Missing CSRF secret");
      });
    });
    
  // -----------------------------
  // 2️⃣ Test LOGIN
  // -----------------------------
  describe("POST /auth/login", () => {
    it("should login successfully and return cookie", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .set("x-csrf-token", csrfToken)
        .set("Cookie", csrfCookie)
        .send({
          email: testUser.email,
          password: testUser.password
        });

      const data = res.body as AuthResponse;
      const rawCookie = res.headers["set-cookie"]?.[0];

      expect(res.status).toBe(200);
      expect(data.email).toBe(testUser.email);
      expect(rawCookie).toBeDefined();
      expect(rawCookie).toMatch(/^token=/);

      loginCookie = rawCookie!.split(";")[0];
    });

    it("should fail with wrong password", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .set("x-csrf-token", csrfToken)
        .set("Cookie", csrfCookie)
        .send({ email: testUser.email, password: "WrongPassword" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Bad credentials");
    });

    it("should fail with unknown email", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .set("x-csrf-token", csrfToken)
        .set("Cookie", csrfCookie)
        .send({ email: "unknown@example.com", password: "Password123!" });

      expect(res.status).toBe(404);
      expect(res.body.error).toBe("Bad credentials");
    });

    it("should fail if validation fails (invalid email format)", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .set("x-csrf-token", csrfToken)
        .set("Cookie", csrfCookie)
        .send({ email: "invalid-email", password: "Password123!" });

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });

    it("should fail if invalid CSRF token", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .set("x-csrf-token", "invalid-csrf-token")
        .set("Cookie", withCookies())
        .send({email: testUser.email, password: testUser.password });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe("Invalid CSRF token");
    });

    it("should fail if missing CSRF token", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .set("Cookie", withCookies()) 
        .send({email: testUser.email, password: testUser.password });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe("Missing CSRF token ");
    });

    it("should fail if missing CSRF secret", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .set("x-csrf-token", csrfToken)
        .set("Cookie", loginCookie)
        .send({email: testUser.email, password: testUser.password });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe("Missing CSRF secret");
    });
  });

  // -----------------------------
  // 3️⃣ Test GET /auth/me
  // -----------------------------
  describe("GET /auth/me", () => {
    it("should get current logged-in user", async () => {
      const res = await request(app)
        .get("/api/auth/me")
        .set("Cookie", loginCookie);

      const data = res.body as AuthResponse;

      expect(res.status).toBe(200);
      expect(data.email).toBe(testUser.email);
    });

    it("should fail if not authenticated", async () => {
      const res = await request(app).get("/api/auth/me");
      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Access denied");
    });
  });

  // -----------------------------
  // 4️⃣ Test LOGOUT
  // -----------------------------
  describe("POST /auth/logout", () => {
    it("should logout successfully", async () => {
      const res = await request(app)
        .post("/api/auth/logout")
        .set("x-csrf-token", csrfToken)
        .set("Cookie", withCookies());

      const rawCookie = res.headers["set-cookie"]?.[0];

      expect(res.status).toBe(200);
      expect(rawCookie).toBeDefined();
      expect(rawCookie).toMatch(/token=;/);
      expect(rawCookie).toMatch(/Expires=/);
      expect(res.body.message).toBe("Logged out");
    });

    it("should fail if not authenticated", async () => {
      const res = await request(app)
        .post("/api/auth/logout")
        .set("x-csrf-token", csrfToken)
        .set("Cookie", csrfCookie);
      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Access denied");
    });
    
    it("should fail if invalid CSRF token", async () => {
      const res = await request(app)
        .post("/api/auth/logout")
        .set("x-csrf-token", "invalid-csrf-token")
        .set("Cookie", withCookies());

      expect(res.status).toBe(403);
      expect(res.body.error).toBe("Invalid CSRF token");
    });

    it("should fail if missing CSRF token", async () => {
      const res = await request(app)
        .post("/api/auth/logout")
        .set("Cookie", withCookies());

      expect(res.status).toBe(403);
      expect(res.body.error).toBe("Missing CSRF token ");
    });

    it("should fail if missing CSRF secret", async () => {
      const res = await request(app)
        .post("/api/auth/logout")
        .set("x-csrf-token", csrfToken)
        .set("Cookie", loginCookie);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe("Missing CSRF secret");
    });
  });

  // -----------------------------
  // 5️⃣ Test PUT /auth/me (update user info)
  // -----------------------------
  describe("PUT /auth/me", () => {
    it("should update current user info successfully", async () => {
      const res = await request(app)
        .put("/api/auth/me")
        .set("Cookie", withCookies())
        .set("x-csrf-token", csrfToken)
        .send({
          firstname: "UpdatedFirst",
          lastname: "UpdatedLast",
          email: "updated@example.com"
        });

      const data = res.body as AuthResponse;
      expect(res.status).toBe(200);
      expect(data.firstname).toBe("UpdatedFirst");
      expect(data.lastname).toBe("UpdatedLast");
      expect(data.email).toBe("updated@example.com");
    });

    it("should fail if email is already used", async () => {
      const res = await request(app)
        .put("/api/auth/me")
        .set("Cookie", withCookies())
        .set("x-csrf-token", csrfToken)
        .send({ firstname: "Test", lastname: "User", email: "manon.thez@oclock.school" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("An account with this email address already exists.");
    });

    it("should fail if validation fails", async () => {
      const res = await request(app)
        .put("/api/auth/me")
        .set("Cookie", withCookies())
        .set("x-csrf-token", csrfToken)
        .send({ firstname: "", lastname: "", email: "invalid-email" });

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });

    it("should fail if not authenticated", async () => {
      const res = await request(app)
        .put("/api/auth/me")
        .set("x-csrf-token", csrfToken)
        .set("Cookie", csrfCookie)
        .send({ firstname: "Test", lastname: "User", email: "new@example.com" });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Access denied");
    });
    
    it("should fail if invalid CSRF token", async () => {
      const res = await request(app)
        .put("/api/auth/me")
        .set("x-csrf-token", "invalid-csrf-token")
        .set("Cookie", withCookies())
        .send({
          firstname: "UpdatedFirst",
          lastname: "UpdatedLast",
          email: "updated@example.com"
        });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe("Invalid CSRF token");
    });

    it("should fail if missing CSRF token", async () => {
      const res = await request(app)
        .put("/api/auth/me")
        .set("Cookie", withCookies())
        .send({
          firstname: "UpdatedFirst",
          lastname: "UpdatedLast",
          email: "updated@example.com"
        });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe("Missing CSRF token ");
    });

    it("should fail if missing CSRF secret", async () => {
      const res = await request(app)
        .put("/api/auth/me")
        .set("x-csrf-token", csrfToken)
        .set("Cookie", loginCookie)
        .send({
          firstname: "UpdatedFirst",
          lastname: "UpdatedLast",
          email: "updated@example.com"
        });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe("Missing CSRF secret");
    });
  });

  // -----------------------------
  // 6️⃣ Test PATCH /auth/me/password
  // -----------------------------
  describe("PATCH /auth/me/password", () => {
    it("should update password successfully", async () => {
      const res = await request(app)
        .patch("/api/auth/me/password")
        .set("Cookie", withCookies())
        .set("x-csrf-token", csrfToken)
        .send({
          oldPassword: testUser.password,
          newPassword: "NewPassword123!",
          confirmedPassword: "NewPassword123!"
        });

      const data = res.body as AuthResponse;
      expect(res.status).toBe(200);
      expect(data).not.toHaveProperty("password");

      // Mettre à jour testUser.password pour les prochains tests
      testUser.password = "NewPassword123!";
    });

    it("should fail if old password is incorrect", async () => {
      const res = await request(app)
        .patch("/api/auth/me/password")
        .set("Cookie", withCookies())
        .set("x-csrf-token", csrfToken)
        .send({
          oldPassword: "WrongPassword",
          newPassword: "AnotherPassword123!",
          confirmedPassword: "AnotherPassword123!"
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Bad credentials");
    });

    it("should fail if validation fails (password too short)", async () => {
      const res = await request(app)
        .patch("/api/auth/me/password")
        .set("Cookie", withCookies())
        .set("x-csrf-token", csrfToken)
        .send({
          oldPassword: testUser.password,
          newPassword: "123",
          confirmedPassword: "123"
        });

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });

    it("should fail if new password and confirmed password are different", async () => {
      const res = await request(app)
        .patch("/api/auth/me/password")
        .set("Cookie", withCookies())
        .set("x-csrf-token", csrfToken)
        .send({
          oldPassword: testUser.password,
          newPassword: "AnotherPassword123!",
          confirmedPassword: "AnotherPassword123?"
        });

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });

    it("should fail if not authenticated", async () => {
      const res = await request(app)
        .patch("/api/auth/me/password")
        .set("x-csrf-token", csrfToken)
        .set("Cookie", csrfCookie)
        .send({
          oldPassword: testUser.password,
          newPassword: "12345678",
          confirmedPassword: "12345678"
        });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe("Access denied");
    });

    it("should fail if invalid CSRF token", async () => {
      const res = await request(app)
        .patch("/api/auth/me/password")
        .set("x-csrf-token", "invalid-csrf-token")
        .set("Cookie", withCookies())
        .send({
          oldPassword: testUser.password,
          newPassword: "NewPassword123!",
          confirmedPassword: "NewPassword123!"
        });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe("Invalid CSRF token");
    });

    it("should fail if missing CSRF token", async () => {
      const res = await request(app)
        .patch("/api/auth/me/password")
        .set("Cookie", withCookies())
        .send({
          oldPassword: testUser.password,
          newPassword: "NewPassword123!",
          confirmedPassword: "NewPassword123!"
        });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe("Missing CSRF token ");
    });

    it("should fail if missing CSRF secret", async () => {
      const res = await request(app)
        .patch("/api/auth/me/password")
        .set("x-csrf-token", csrfToken)
        .set("Cookie", loginCookie)
        .send({
          oldPassword: testUser.password,
          newPassword: "NewPassword123!",
          confirmedPassword: "NewPassword123!"
        });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe("Missing CSRF secret");
    });
  });

});
