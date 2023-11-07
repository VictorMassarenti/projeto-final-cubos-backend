import joi from "joi";

const schemaOrder = joi.object({
  cliente_id: joi.number().integer().required().messages({
    "any.required": "cliente field is required",
    "number.base": "cliente field is a required integer",
  }),

  observacao: joi.string().allow("").messages({
    "string.empty": "observacao field is required",
  }),

  //testar
  pedido_produtos: joi
    .array()
    .items(
      joi.object({
        produto_id: joi.number().integer().required().messages({
          "any.required": "produto_id field is required",
          "number.base": "produto_id field is a required integer",
        }),
        quantidade_produto: joi.number().integer().required().messages({
          "any.required": "quantidade_produto field is required",
          "number.base": "quantidade_produto field is a required integer",
        }),
      })
    )
    .required()
    .messages({
      "any.required": "pedido_produtos field is required",
      "array.base": "pedido_produtos field is a required array",
    }),
});

export default schemaOrder;
