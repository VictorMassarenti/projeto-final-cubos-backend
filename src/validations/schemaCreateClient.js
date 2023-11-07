import joi from "joi";

const schemaCreateClient = joi.object({
  nome: joi.string().trim().required().messages({
    "any.required": "Nome field is required",
    "string.empty": "Nome field is required",
    "string.trim": "Nome field cannot start or end with empty spaces",
  }),

  email: joi.string().trim().email().required().messages({
    "string.email": "Email field invalid format",
    "any.required": "Email field is required",
    "string.empty": "Email field is required",
    "string.trim": "Email field cannot start or end with empty spaces",
  }),

  cpf: joi.string().trim().length(11).required().messages({
    "any.required": "CPF field is required",
    "string.empty": "CPF field is required",
    "string.length": "CPF field must have 11 characters",
    "string.trim": "CPF field cannot start or end with empty spaces",
  }),

  cep: joi.string().trim().length(8).messages({
    "string.empty": "CEP empty string field denied",
    "string.length": "CEP field must have 8 characters",
    "string.trim": "CEP field cannot start or end with empty spaces",
  }),

  rua: joi.string().trim().messages({
    "string.empty": "Rua empty string field denied",
    "string.trim": "Rua field cannot start or end with empty spaces",
  }),

  numero: joi.string().trim().messages({
    "string.empty": "Numero empty string field denied",
    "string.trim": "Numero field cannot start or end with empty spaces",
  }),

  bairro: joi.string().trim().messages({
    "string.empty": "Bairro empty string field denied",
    "string.trim": "Bairro field cannot start or end with empty spaces",
  }),

  cidade: joi.string().trim().messages({
    "string.empty": "Cidade empty string field denied",
    "string.trim": "Cidade field cannot start or end with empty spaces",
  }),

  estado: joi.string().trim().messages({
    "string.empty": "Estado empty string field denied",
    "string.trim": "Estado field cannot start or end with empty spaces",
  }),
});

export default schemaCreateClient;
