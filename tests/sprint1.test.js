const request = require("supertest");
const { cleanUpUsers } = require("./cleanFunctions.js");
const dotenv = require("dotenv");
dotenv.config();

describe("Testes de funcionalidade sprint 1", () => {
  afterAll(async () => {
    await cleanUpUsers();
  });

  it("GET /categoria 200 e todas as categorias listadas", async () => {
    const response = await request(process.env.URL_TEST).get("/categoria");

    const expectedCategories = [
      { id: 1, descricao: "Informática" },
      { id: 2, descricao: "Celulares" },
      { id: 3, descricao: "Beleza e Perfumaria" },
      { id: 4, descricao: "Mercado" },
      { id: 5, descricao: "Livros e Papelaria" },
      { id: 6, descricao: "Brinquedos" },
      { id: 7, descricao: "Moda" },
      { id: 8, descricao: "Bebê" },
      { id: 9, descricao: "Games" },
    ];

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedCategories);
  });

  it("POST /usuario 201 e o body do usuario sem senha", async () => {
    const response = await request(process.env.URL_TEST).post("/usuario").send({
      nome: "Teste",
      email: "test@example.com",
      senha: "123456",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      nome: "Teste",
      email: "test@example.com",
    });
  });

  it("POST /login 200 e token", async () => {
    const response = await request(process.env.URL_TEST).post("/login").send({
      email: "test@example.com",
      senha: "123456",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });

  it("GET /usuario 200 e informações do usuário", async () => {
    const login = await request(process.env.URL_TEST).post("/login").send({
      email: "test@example.com",
      senha: "123456",
    });

    const response = await request(process.env.URL_TEST)
      .get("/usuario")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(Number),
      nome: "Teste",
      email: "test@example.com",
    });
  });

  it("PUT /usuario 201 e informações atualizadas do usuário", async () => {
    const login = await request(process.env.URL_TEST).post("/login").send({
      email: "test@example.com",
      senha: "123456",
    });

    const response = await request(process.env.URL_TEST)
      .put("/usuario")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send({
        nome: "TesteAlterado",
        email: "test2@example.com",
        senha: "1234567",
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      nome: "TesteAlterado",
      email: "test2@example.com",
    });
  });

  it("POST /login como novo acesso 200 e token", async () => {
    const response = await request(process.env.URL_TEST).post("/login").send({
      email: "test2@example.com",
      senha: "1234567",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
