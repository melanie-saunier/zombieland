import request from "supertest";
import { app } from "../src/index.js";
import { Activity } from "../src/models/association.js";

describe("Activity routes e2e", () => {

  // -----------------------------
  // GET /activities
  // -----------------------------
  describe("GET /activities", () => {
    it("should return all activities", async () => {
      const res = await request(app).get("/api/activities");

      if (res.status === 404) {
        // Si la bdd est vide, on peut s'assurer que le message est correct
        expect(res.body.message).toBe("No activities stored in the database");
      } else {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        if (res.body.length > 0) {
          expect(res.body[0]).toHaveProperty("id");
          expect(res.body[0]).toHaveProperty("name");
          expect(res.body[0]).toHaveProperty("category");
          expect(res.body[0]).toHaveProperty("level");
        }
      }
    });
  });

  // -----------------------------
  // GET /activities/:id
  // -----------------------------
  describe("GET /activities/:id", () => {
    it("should return an activity by id", async () => {
      // On récupère d'abord un id existant en base
      const activity = await Activity.findOne();
      if (!activity) return; // on skip le test si aucune activité en bdd

      const res = await request(app).get(`/api/activities/${activity.id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id", activity.id);
      expect(res.body).toHaveProperty("name", activity.name);
      expect(res.body).toHaveProperty("category");
      expect(res.body).toHaveProperty("level");
    });

    it("should return 404 if activity not found", async () => {
      const res = await request(app).get("/api/activities/999999"); // id improbable

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("No activity found with id: 999999");
    });
  });

  // -----------------------------
  // GET /activities/most-scary
  // -----------------------------
  describe("GET /activities/most-scary", () => {
    it("should return most scary activities (level.value=3)", async () => {
      const res = await request(app).get("/api/activities/most-scary?limit=2");

      if (res.status === 404) {
        expect(res.body.message).toBe("No activities stored in the database");
      } else {
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeLessThanOrEqual(2);
        res.body.forEach((activity: any) => {
          expect(activity.level.value).toBe(3);
        });
      }
    });

    it("should default to 4 activities if limit not provided", async () => {
      const res = await request(app).get("/api/activities/most-scary");

      if (res.status !== 404) {
        expect(res.body.length).toBeLessThanOrEqual(4);
      }
    });
  });

});
