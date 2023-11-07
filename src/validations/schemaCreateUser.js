import joi from "joi";

const schemaCreateUser = joi.object({
  nome: joi.string().required().messages({
    "any.required": "Nome field is required",
    "string.empty": "Nome field is required",
  }),

  email: joi.string().email().required().messages({
    "string.email": "Email field invalid format",
    "any.required": "Email field is required",
    "string.empty": "Email field is required",
  }),

  senha: joi.string().required().messages({
    "any.required": "Senha field is required",
    "string.empty": "Senha field is required",
  }),
});

export default schemaCreateUser;
