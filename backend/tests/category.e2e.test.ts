import request from "supertest";
import { app } from "../src/index.js";
import { Category } from "../src/models/association.js";

describe("Category routes e2e", () => {

  // -----------------------------
  // GET /categories
  // -----------------------------
  describe("GET /categories", () => {
    it("should return all categories", async () => {
      const res = await request(app).get("/api/categories");

      if (res.status === 404) {
        // Si la table est vide, vérifier le message
        expect(res.body.message).toBe("No categories stored in the database");
      } else {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        if (res.body.length > 0) {
          expect(res.body[0]).toHaveProperty("id");
          expect(res.body[0]).toHaveProperty("name");
        }
      }
    });
  });

  // -----------------------------
  // GET /categories/:id
  // -----------------------------
  describe("GET /categories/:id", () => {
    it("should return a category by id", async () => {
      const category = await Category.findOne();
      if (!category) return; // on skip le test si aucune catégorie en bdd

      const res = await request(app).get(`/api/categories/${category.id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id", category.id);
      expect(res.body).toHaveProperty("name", category.name);
    });

    it("should return 404 if category not found", async () => {
      const res = await request(app).get("/api/categories/999999"); // id improbable

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("No category found with id: 999999");
    });
  });

});

