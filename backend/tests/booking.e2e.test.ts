import request from "supertest";
import { app } from "../src/index.js";

describe("Booking routes e2e", () => {
  // Utilisateurs de test (déjà présents dans la base)
  const adminUser = {
    email: "manon.thez@oclock.school",
    password: "P@ssword123456"
  };

  // alfred le chien, id = 6
  //  ses bookings
  // id = 2 => 07/11/2025 status true
  // id = 3 => 10/11/2025 status false
  // id 4 => 26/10/2025 status true
  // id 5 => 07/11/2025 status true
  const memberUser = {
    email: "alfred.lechien@gmail.com",
    password: "P@ssword123456"
  };

  // Cookie pour authentification
  let adminCookie: string;
  let memberCookie: string;

  type BookingResponse = {
    id: number;
    visit_date: string;
    nb_people: number;
    status: boolean;
    user_id: number;
    created_at: string;
    updated_at: string;
    bookingPrices: {
      applied_price: number;
      price: { label: string; value: number };
    }[];
  };

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
  // GET ALL BOOKINGS (admin only)
  // -----------------------------
  describe("GET /bookings", () => {
    it("should return all bookings for admin", async () => {
      const res = await request(app)
        .get("/api/bookings")
        .set("Cookie", adminCookie);

      const data = res.body as BookingResponse[];
      expect(res.status).toBe(200);
      expect(data.length).toBeGreaterThan(0);
    });

    it("should fail for non-admin", async () => {
      const res = await request(app)
        .get("/api/bookings")
        .set("Cookie", memberCookie);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe("Forbidden: Admins only");
    });
  });

  // -----------------------------
  // GET BOOKING BY ID
  // -----------------------------
  describe("GET /bookings/:id", () => {
    it("should return a booking for owner", async () => {
      const res = await request(app)
        .get("/api/bookings/2")
        .set("Cookie", memberCookie);

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(2);
    });

    it("should return 403 if user is not owner or admin", async () => {
      const res = await request(app)
        .get("/api/bookings/1") // booking id 1 => appartient à octave le chat
        .set("Cookie", memberCookie);

      expect(res.status).toBe(403);
      expect(res.body.message).toBe("Unauthorized");
    });

    it("should return 404 if booking does not exist", async () => {
      const res = await request(app)
        .get("/api/bookings/999")
        .set("Cookie", adminCookie);

      expect(res.status).toBe(404);
    });
  });

  // -----------------------------
  // GET BOOKINGS FOR USER
  // -----------------------------
  describe("GET /bookings/user/:id", () => {
    it("should return bookings for owner", async () => {
      const res = await request(app)
        .get("/api/bookings/user/6") // Alfred Lechien id
        .set("Cookie", memberCookie);

      expect(res.status).toBe(200);
      expect(res.body[0].user_id).toBe(6);
    });

    it("should fail if not owner or admin", async () => {
      const res = await request(app)
        .get("/api/bookings/user/5") // Octave Lechat id
        .set("Cookie", memberCookie);

      expect(res.status).toBe(403);
      expect(res.body.message).toBe("Unauthorized");
    });
  });

  // -----------------------------
  // CREATE BOOKING
  // -----------------------------
  describe("POST /bookings", () => {
    const newBooking = {
      visit_date: new Date("2026-11-30"),
      nb_people: 2,
      status: true,
      user_id: 6
    };

    it("should create a booking for authenticated user", async () => {
      const res = await request(app)
        .post("/api/bookings")
        .set("Cookie", memberCookie)
        .send(newBooking);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.nb_people).toBe(2);
    });

    it("should fail validation", async () => {
      const res = await request(app)
        .post("/api/bookings")
        .set("Cookie", memberCookie)
        .send({ visit_date: "invalid-date", nb_people: -1, status: true, user_id: 6 });

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  // -----------------------------
  // UPDATE BOOKING (admin only)
  // -----------------------------
  describe("PUT /bookings/:id", () => {
    it("should update a booking as admin", async () => {
      const res = await request(app)
        .put("/api/bookings/1")
        .set("Cookie", adminCookie)
        .send({ nb_people: 10 });

      expect(res.status).toBe(200);
      expect(res.body.nb_people).toBe(10);
    });

    it("should fail if not admin", async () => {
      const res = await request(app)
        .put("/api/bookings/1")
        .set("Cookie", memberCookie)
        .send({ nb_people: 5 });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe("Forbidden: Admins only");
    });
  });

  // -----------------------------
  // UPDATE BOOKING FOR USER
  // -----------------------------
  describe("PATCH /bookings/:id/user", () => {
    it("should allow user to update their own booking", async () => {
      const res = await request(app)
        .patch("/api/bookings/2/user")
        .set("Cookie", memberCookie)
        .send({ visit_date: new Date("2026-11-30"), nb_people: 3 });

      expect(res.status).toBe(200);
      expect(res.body.nb_people).toBe(3);
    });

    it("should fail if updating someone else's booking", async () => {
      const res = await request(app)
        .patch("/api/bookings/1/user")
        .set("Cookie", memberCookie)
        .send({ nb_people: 1 });

      expect(res.status).toBe(403);
    });

    it("should fail validation", async () => {
      const res = await request(app)
        .patch("/api/bookings/2/user")
        .set("Cookie", memberCookie)
        .send({ nb_people: -5 });

      expect(res.status).toBe(400);
    });

    it("should fail if new booking data is in the past", async () => {
      const res = await request(app)
        .patch("/api/bookings/2/user")
        .set("Cookie", memberCookie)
        .send({ visit_date: new Date("2022-11-30").toISOString().split("T")[0] });

      expect(res.status).toBe(400);
    });
  });

  // -----------------------------
  // CANCEL BOOKING
  // -----------------------------
  describe("PATCH /bookings/:id/cancel", () => {
    it("should cancel a future booking", async () => {
      const res = await request(app)
        .patch("/api/bookings/5/cancel")
        .set("Cookie", memberCookie);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe(false);
    });

    it("should fail if already cancelled", async () => {
      const res = await request(app)
        .patch("/api/bookings/3/cancel")
        .set("Cookie", memberCookie);

      expect(res.status).toBe(400);
    });

    it("should fail if past date", async () => {
      const res = await request(app)
        .patch("/api/bookings/4/cancel") // booking with past date
        .set("Cookie", memberCookie);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Cannot cancel a booking for a past visit date.");
    });
  });

  // -----------------------------
  // DELETE BOOKING (admin only)
  // -----------------------------
  describe("DELETE /bookings/:id", () => {
    it("should delete booking as admin", async () => {
      const res = await request(app)
        .delete("/api/bookings/1")
        .set("Cookie", adminCookie);

      expect(res.status).toBe(204);
    });

    it("should fail if not admin", async () => {
      const res = await request(app)
        .delete("/api/bookings/7")
        .set("Cookie", memberCookie);

      expect(res.status).toBe(403);
      expect(res.body.error).toBe("Forbidden: Admins only");
    });
  });
});
