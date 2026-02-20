const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    it("GET /cafes → responde 200 y retorna un array con >0 objetos", async () => {
        const res = await request(server).get("/cafes");

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("DELETE /cafes/:id → responde 404 si elimina un café que no existe", async () => {
        const res = await request(server)
            .delete("/cafes/999")
            .set("Authorization", "token_fake");

        expect(res.statusCode).toBe(404);
    });

    it("POST /cafes → crea un nuevo café y responde 201", async () => {
        const nuevoCafe = {
            id: Date.now(),
            nombre: "Latte"
        };

        const res = await request(server)
            .post("/cafes")
            .send(nuevoCafe);

        expect(res.statusCode).toBe(201);
        expect(res.body).toContainEqual(nuevoCafe);
    });

    it("PUT /cafes/:id → responde 400 si actualiza un café con ids que no coinciden", async () => {
        const cafe = {
            id: 999,
            nombre: "Cafe incorrecto"
        };

        const res = await request(server)
            .put("/cafes/1")
            .send(cafe);

        expect(res.statusCode).toBe(400);
    });


});
