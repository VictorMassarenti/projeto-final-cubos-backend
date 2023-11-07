import joi from "joi";

const isNumber = (value) => {
  if (Number.isInteger(value)) {
    return value;
  }
  throw new Error("Invalid number format");
};

const schemaRegisterProduct = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "Descrição field is required",
    "string.empty": "Descrição field is required",
  }),

  quantidade_estoque: joi
    .custom(isNumber, "custom validation")
    .required()
    .messages({
      "any.required": "Quantidade no estoque field is required",
      "custom.validation": "Quantidade no estoque must be a valid number",
    }),

  valor: joi.custom(isNumber, "custom validation").required().messages({
    "any.required": "Valor field is required",
    "custom.validation": "Valor must be a valid number",
  }),

  categoria_id: joi.custom(isNumber, "custom validation").required().messages({
    "any.required": "ID da categoria field is required",
    "custom.validation": "ID da categoria must be a valid number",
  }),
});

export default schemaRegisterProduct;
