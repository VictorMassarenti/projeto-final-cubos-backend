const request = require("supertest");
const { cleanUpClients } = require("./cleanFunctions.js");
const dotenv = require("dotenv");
dotenv.config();

describe("Testes de funcionalidade sprint 2", () => {
  let login = undefined;
  let produto = undefined;
  let cliente = undefined;

  beforeAll(async () => {
    login = await request(process.env.URL_TEST).post("/login").send({
      email: "test@user.com",
      senha: "123456",
    });
  });

  afterAll(async () => {
    await cleanUpClients();
  });

  it("POST /produto 201 e produto cadastrado", async () => {
    const objectBody = {
      descricao: "Produto de teste",
      quantidade_estoque: 10,
      valor: 1000,
      categoria_id: 1,
    };

    const response = await request(process.env.URL_TEST)
      .post("/produto")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(objectBody);

    produto = response.body;

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      ...objectBody,
    });
  });

  it("PUT /produto/:id 200 e produto atualizado", async () => {
    const objectBody = {
      descricao: "Produto de teste atualizado",
      quantidade_estoque: 0,
      valor: 5000,
      categoria_id: 5,
    };

    const response = await request(process.env.URL_TEST)
      .put(`/produto/${produto.id}`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(objectBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: produto.id,
      ...objectBody,
    });
  });

  it("GET /produto 200 e todos produtos cadastrados", async () => {
    const response = await request(process.env.URL_TEST)
      .get("/produto")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          descricao: expect.any(String),
          quantidade_estoque: expect.any(Number),
          valor: expect.any(Number),
          categoria_id: expect.any(Number),
        }),
      ])
    );
  });

  it("GET /produto/:id 200 e produto", async () => {
    const response = await request(process.env.URL_TEST)
      .get(`/produto/${produto.id}`)
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: produto.id,
      descricao: expect.any(String),
      quantidade_estoque: expect.any(Number),
      valor: expect.any(Number),
      categoria_id: expect.any(Number),
    });
  });

  it("DELETE /produto/:id 404 testar se o produto realmente foi deletado", async () => {
    await request(process.env.URL_TEST)
      .delete(`/produto/${produto.id}`)
      .set("Authorization", `Bearer ${login.body.token}`);

    const response = await request(process.env.URL_TEST)
      .get(`/produto/${produto.id}`)
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(404);
  });

  // ROTAS DE CLIENTE ABAIXO

  it("POST /cliente 201 e cliente cadastrado", async () => {
    const objectBody = {
      nome: "Cliente de teste",
      email: "cliente2@example.com",
      cpf: "12345678900",
      cep: "12345678",
      rua: "Rua de teste",
      numero: "123",
      bairro: "Bairro de teste",
      cidade: "Cidade de teste",
      estado: "Estado de teste",
    };

    const response = await request(process.env.URL_TEST)
      .post("/cliente")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(objectBody);

    cliente = response.body;

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      ...objectBody,
    });
  });

  it("PUT /cliente/:id 200 e cliente atualizado", async () => {
    const objectBody = {
      nome: "Cliente de teste atualizado",
      email: "cliente2@example.com",
      cpf: "12345678900",
      cep: "12345678",
      rua: "Rua de teste atualizada",
      numero: "1234",
      bairro: "Bairro de teste atualizado",
      cidade: "Cidade de teste atualizado",
      estado: "Estado de teste atualizado",
    };

    const response = await request(process.env.URL_TEST)
      .put(`/cliente/${cliente.id}`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(objectBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: cliente.id,
      ...objectBody,
    });
  });

  it("GET /cliente 200 e todos clientes cadastrados", async () => {
    const response = await request(process.env.URL_TEST)
      .get("/cliente")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          email: expect.any(String),
          cpf: expect.any(String),
          cep: expect.any(String),
          rua: expect.any(String),
          numero: expect.any(String),
          bairro: expect.any(String),
          cidade: expect.any(String),
          estado: expect.any(String),
        }),
      ])
    );
  });

  it("GET /cliente/:id 200 e cliente", async () => {
    const response = await request(process.env.URL_TEST)
      .get("/cliente/1")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      nome: expect.any(String),
      email: expect.any(String),
      cpf: expect.any(String),
      cep: expect.any(String),
      rua: expect.any(String),
      numero: expect.any(String),
      bairro: expect.any(String),
      cidade: expect.any(String),
      estado: expect.any(String),
    });
  });
});
