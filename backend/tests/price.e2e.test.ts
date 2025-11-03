import request from "supertest";
import { app } from "../src/index";
import { Price } from "../src/models/association.js";

describe("Price routes e2e", () => {
    // Utilisateurs de test (déjà présents dans la base)
    const adminUser = {
      email: "manon.thez@oclock.school",
      password: "P@ssword123456"
    };
  
    const memberUser = {
      email: "alfred.lechien@gmail.com",
      password: "P@ssword123456"
    };
  
    // Cookie pour authentification
    let adminCookie: string;
    let memberCookie: string;
  
    // -----------------------------
    // LOGIN USERS
    // -----------------------------
    beforeAll(async () => {
      const adminRes = await request(app)
        .post("/api/auth/login")
        .send(adminUser);
      adminCookie = adminRes.headers["set-cookie"]?.[0];
  
      const memberRes = await request(app)
        .post("/api/auth/login")
        .send(memberUser);
      memberCookie = memberRes.headers["set-cookie"]?.[0];
    });

  // -----------------------------
  // GET /prices
  // -----------------------------
  describe("GET /prices", () => {
    it("should return all prices", async () => {
      const res = await request(app).get("/api/prices");

      if (res.status === 404) {
        expect(res.body.message).toBe("No prices stored in the database");
      } else {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        if (res.body.length > 0) {
          expect(res.body[0]).toHaveProperty("id");
          expect(res.body[0]).toHaveProperty("label");
          expect(res.body[0]).toHaveProperty("value");
        }
      }
    });
  });

  // -----------------------------
  // GET /prices/:id
  // -----------------------------
  describe("GET /prices/:id", () => {
    it("should return a price by id", async () => {
      const price = await Price.findOne();
      if (!price) return; // skip si aucune entrée

      const res = await request(app).get(`/api/prices/${price.id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id", price.id);
      expect(res.body).toHaveProperty("label", price.label);
      expect(res.body).toHaveProperty("value", price.value);
    });

    it("should return 404 if price not found", async () => {
      const res = await request(app).get("/api/prices/999999");

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("No price found with id: 999999");
    });
  });

  // -----------------------------
  // POST /prices
  // -----------------------------
  describe("POST /prices", () => {
    it("should create a new price as admin", async () => {
      const newPrice = { label: "Test Price", value: 42 };

      const res = await request(app)
        .post("/api/prices")
        .set("Cookie", adminCookie)
        .send(newPrice);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.label).toBe(newPrice.label);
      expect(parseFloat(res.body.value)).toBe(newPrice.value);
    });

    it("should fail if not admin", async () => {
      const res = await request(app)
        .post("/api/prices")
        .set("Cookie", memberCookie)
        .send({ label: "Fail Price", value: 10 });

      expect(res.status).toBe(403);
    });

    it("should fail validation", async () => {
      const res = await request(app)
        .post("/api/prices")
        .set("Cookie", adminCookie)
        .send({ label: "", value: -5 });

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  // -----------------------------
  // PUT /prices/:id
  // -----------------------------
  describe("PUT /prices/:id", () => {
    it("should update a price as admin", async () => {
      const price = await Price.findOne();
      if (!price) return;

      const res = await request(app)
        .put(`/api/prices/${price.id}`)
        .set("Cookie", adminCookie)
        .send({ value: 99 });

      expect(res.status).toBe(200);
      expect(res.body.value).toBe(99);
    });

    it("should return 404 if price does not exist", async () => {
      const res = await request(app)
        .put("/api/prices/999999")
        .set("Cookie", adminCookie)
        .send({ value: 10 });

      expect(res.status).toBe(404);
    });

    it("should fail validation", async () => {
      const price = await Price.findOne();
      if (!price) return;

      const res = await request(app)
        .put(`/api/prices/${price.id}`)
        .set("Cookie", adminCookie)
        .send({ value: -10 });

      expect(res.status).toBe(400);
    });

    it("should fail if not admin", async () => {
      const res = await request(app)
        .put("/api/prices/1")
        .set("Cookie", memberCookie)
        .send({ value: 10 });

      expect(res.status).toBe(403);
    });
  });

  // -----------------------------
  // DELETE /prices/:id
  // -----------------------------
  describe("DELETE /prices/:id", () => {
    it("should delete a price as admin", async () => {
      const price = await Price.findOne();
      if (!price) return;

      const res = await request(app)
        .delete(`/api/prices/${price.id}`)
        .set("Cookie", adminCookie);

      expect(res.status).toBe(204);
    });

    it("should return 404 if price does not exist", async () => {
      const res = await request(app)
        .delete("/api/prices/999999")
        .set("Cookie", adminCookie);

      expect(res.status).toBe(404);
    });

    it("should fail if not admin", async () => {
      const price = await Price.findOne();
      if (!price) return;

      const res = await request(app)
        .delete(`/api/prices/${price.id}`)
        .set("Cookie", memberCookie);

      expect(res.status).toBe(403);
    });
  });
});